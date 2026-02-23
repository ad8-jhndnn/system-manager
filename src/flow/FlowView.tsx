import {
  ReactFlow,
  //  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel,
} from '@xyflow/react';


import '@xyflow/react/dist/style.css';
import { create } from 'zustand'

import useLayoutNodes from './useLayoutNodes';
import { areFlowsCompatible, Flow, FlowDirection, getFlowName } from '../system/kit';
import { ElkNode } from './elkNode';

import useStore, { AppState } from '../system/store';
import { useShallow } from 'zustand/react/shallow';


const selector = (state:AppState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
});

let layoutOptions = {
  'elk.algorithm': 'layered',
  'elk.direction': 'DOWN',
  'elk.layered.spacing.edgeNodeBetweenLayers': '40',
  'elk.spacing.nodeNode': '40',
  'elk.layered.nodePlacement.strategy': 'SIMPLE',
};

export default function FlowView() {

  const { nodes, edges, onNodesChange, onEdgesChange } = useStore(
    useShallow(selector),
  );

  // function updateNodes(flows: Flow[]) {
  //   let nodes: any[] = [];
  //   let edges: any[] = [];
  //   flows.forEach(flow => {
  //     nodes.push({
  //       id: flow.id,
  //       data: { label: flow.fullName },
  //       position: { x: 0, y: 0 },
  //       type: flow.direction === FlowDirection.Source ? 'input' : 'output',
  //     });
  //   });

  //   // create edges between compatible flows
  //   for (let i = 0; i < flows.length; i++) {
  //     if(flows[i].direction == FlowDirection.Sink) continue;
  //     for (let j = 0; j < flows.length; j++) {
  //       if (areFlowsCompatible(flows[i], flows[j])) { 
  //         edges.push({
  //           id: getFlowName(flows[i], flows[j]),
  //           source: flows[i].id,
  //           target: flows[j].id,
  //         });
  //       }
  //     }
  //   }
  //   setEdges(edges);
  //   setNodes(nodes);
  // }

  useLayoutNodes(layoutOptions);

  return (<div style={{ width: '100%', height: '100%', backgroundColor: 'lightgray', border: '1px solid dimgray' }}>
    <ReactFlow
      nodesDraggable={false}
      nodesConnectable={false}
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      fitView>
      <Panel position="top-right">
        <button className="xy-theme__button">
          vertical layout
        </button>
        <button className="xy-theme__button">
          horizontal layout
        </button>
        {/* <button className="xy-theme__button" onClick={() => argle()}>
          sdafdsfds
        </button> */}
      </Panel>

      <Background />
      <MiniMap />

    </ReactFlow>
  </div>
  )
}
