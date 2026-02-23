import {
  ReactFlow,
  //  Controls,
  Background,
  MiniMap,
  Panel,
} from '@xyflow/react';


import '@xyflow/react/dist/style.css';

import useLayoutNodes from './useLayoutNodes';

import useStore, { AppState } from '../system/store';
import { useShallow } from 'zustand/react/shallow';


const selector = (state: AppState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  setIsVertical: state.setIsVertical,
  isVertical: state.isVertical,
});



export default function FlowView() {

  const { nodes, edges, onNodesChange, onEdgesChange, setIsVertical, isVertical } = useStore(
    useShallow(selector),
  );

  function onLayout(iv: boolean) {
    setIsVertical(iv);
  }

  let layoutOptions = {
  'elk.algorithm': 'layered',
  'elk.direction': isVertical ? 'DOWN' : 'RIGHT',
  'elk.layered.spacing.edgeNodeBetweenLayers': '40',
  'elk.spacing.nodeNode': '40',
  'elk.layered.nodePlacement.strategy': 'SIMPLE',
};



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
        <button className="xy-theme__button" onClick={() => onLayout(true)}>
          vertical layout
        </button>
        <button className="xy-theme__button" onClick={() => onLayout(false)}>
          horizontal layout
        </button>
      </Panel>
      <Background />
      <MiniMap />
    </ReactFlow>
  </div>
  )
}
