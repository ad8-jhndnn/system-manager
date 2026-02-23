import {
  type Edge,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from '@xyflow/react';

import { areFlowsCompatible, Flow, FlowMap, FlowDirection, FlowDomain, getFlowName, Item } from './kit';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer'

import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';

export type AppNode = Node;

export interface AddItemInfo {
  name: string
  inputCount: number
  outputCount: number
  itemCount: number
  initialTag: string
}

let idCounter = 0;

function CreateItems(info: AddItemInfo, s: AppState) {
  const newItems: Item[] = [];
  const newFlows: FlowMap = {};
  for (let i = 0; i < info.itemCount; i++) {
    let name: string = info.itemCount === 1 ? info.name : `${info.name} ${i + 1}`;
    const newItem: Item = {
      name: name,
      id: `item-${idCounter++}-id`,
      flowIds: []
    };
    for (let j = 0; j < info.inputCount; j++) {
      let newFlow = {
        label: `Input Flow ${j + 1}`,
        name: `input-flow-${j + 1}`,
        domain: FlowDomain.Audio,
        direction: FlowDirection.Source,
        routeId: "<none>",
        routeChoices: [],
        tags: [] as string[],
        fullName: "",
        id: `${name}-input-${idCounter++}-id`,
        parent: newItem.name
      };
      newFlow.fullName = `${newItem.name}.${newFlow.name}`;
      if (info.initialTag.trim() !== '') newFlow.tags.push(info.initialTag.trim());
      newItem.flowIds.push(newFlow.id);
      newFlows[newFlow.id] = newFlow;
    }
    for (let j = 0; j < info.outputCount; j++) {
      let newFlow = {
        label: `Output Flow ${j + 1}`,
        name: `output-flow-${j + 1}`,
        domain: FlowDomain.Audio,
        direction: FlowDirection.Sink,
        routeId: "<none>",
        routeChoices: [],
        tags: [] as string[],
        fullName: "",
        id: `${name}-output-${idCounter++}-id`,
        parent: newItem.name
      };
      newFlow.fullName = `${newItem.name}.${newFlow.name}`;
      if (info.initialTag.trim() !== '') newFlow.tags.push(info.initialTag.trim());
      newItem.flowIds.push(newFlow.id);
      newFlows[newFlow.id] = newFlow;
    }
    newItems.push(newItem);
  }
  s.items = [...s.items, ...newItems];
  s.flows = UpdateFlowChoices({ ...s.flows, ...newFlows });
}

function UpdateFlowChoices(flows: FlowMap): FlowMap {
  const sourceFlows: FlowMap = {};
  const sinkFlows: FlowMap = {};

  Object.keys(flows).forEach(flowId => {
    const flow = flows[flowId];
    flow.routeChoices = [];
    if (flow.direction === FlowDirection.Source) sourceFlows[flowId] = flow;
    else sinkFlows[flowId] = flow;
  })

  Object.values(sinkFlows).forEach(flow => {
    flow.routeChoices.push("<none>");
    Object.keys(sourceFlows).forEach(sf => {
      if (areFlowsCompatible(flow, sourceFlows[sf])) flow.routeChoices.push(sf);
    })
  })
  return { ...sourceFlows, ...sinkFlows };
}

function getNodes(flows: FlowMap): AppNode[] {
  return Object.keys(flows).map((id, index) => ({
    id: id,
    data: { label: flows[id].fullName },
    position: { x: 0, y: 0 },
    type: flows[id].direction === FlowDirection.Source ? 'input' : 'output',
  }))
}

function getEdges(flows: FlowMap): Edge[] {
  let edges: Edge[] = [];
  for (let sourceKey in flows) {
    if (flows[sourceKey].direction === FlowDirection.Source) {
      for (let sinkKey in flows) {
        if (areFlowsCompatible(flows[sourceKey], flows[sinkKey])) {
          let active = flows[sinkKey].routeId === sourceKey;
          edges.push({
            id: getFlowName(sourceKey, sinkKey),
            source: sourceKey,
            target: sinkKey,
            animated: active,
            style: {
              strokeWidth: active ? 3 : 1,
              stroke: active ? "red" : "black"
            }
          });
        }
      }
    }
  }
  return edges;
}

export type AppState = {
  nodes: AppNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  isVertical: boolean;
  setIsVertical: (isVertical: boolean) => void;
  //
  items: Item[];
  flows: { [key: string]: Flow };
  addItem: (info: AddItemInfo) => void;
  updateFlowName: (flowId: string, newName: string) => void;
  updateFlowRoute: (flowId: string, routeId: string) => void;
  addTag: (flowId: string, tag: string) => void;
  removeTag: (flowId: string, tag: string) => void;
};

const initialNodes: AppNode[] = [];
const initialEdges: Edge[] = [];

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useKitStore = create<AppState>()(
  immer((set) => ({
    nodes: initialNodes,
    edges: initialEdges,
    onNodesChange: (changes) => {
      set((s) => {
        s.nodes = applyNodeChanges(changes, s.nodes);
      });
    },
    onEdgesChange: (changes) => {
      set((s) => {
        s.edges = applyEdgeChanges(changes, s.edges);
      });
    },
    onConnect: (connection) => {
      set((s) => {
        s.edges = addEdge(connection, s.edges);
      });
    },
    setNodes: (nodes) => {
      set({ nodes });
    },
    setEdges: (edges) => {
      set({ edges });
    },
    items: [],
    flows: {},
    addItem: (info) =>
      set((s) => {
        CreateItems(info, s);
        s.nodes = getNodes(s.flows);
        s.edges = getEdges(s.flows);
      }),
    updateFlowRoute: (flowId: string, routeId: string) =>
      set((s) => {
        s.flows[flowId].routeId = routeId;
        s.edges = getEdges(s.flows);
      }),
    updateFlowName: (flowId: string, newName: string) =>
      set((s) => {
        s.flows[flowId].name = newName;
        s.flows[flowId].fullName = `${s.flows[flowId].parent}.${newName}`;
        UpdateFlowChoices(s.flows);
        s.nodes = getNodes(s.flows);
      }),
    addTag: (flowId: string, tag: string) =>
      set((s) => {
        if (!s.flows[flowId].tags.includes(tag)) {
          s.flows[flowId].tags.push(tag);
          UpdateFlowChoices(s.flows);
          s.nodes = getNodes(s.flows);
          s.edges = getEdges(s.flows);
        }
      }),
    removeTag: (flowId: string, tag: string) =>
      set((s) => {
        s.flows[flowId].tags = s.flows[flowId].tags.filter(t => t !== tag);
        UpdateFlowChoices(s.flows);
        s.nodes = getNodes(s.flows);
        s.edges = getEdges(s.flows);
      }),
    isVertical: true,
    setIsVertical: (isVertical: boolean) =>
      set((s) => {
        s.isVertical = isVertical;
        s.nodes = getNodes(s.flows);
        s.edges = getEdges(s.flows);
      })
  })));

export default useKitStore;
