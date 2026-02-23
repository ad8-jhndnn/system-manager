import { useEffect } from 'react';
import ELK, { type LayoutOptions } from 'elkjs/lib/elk.bundled.js';
import { 
  type Edge, 
  useNodesInitialized, 
  useReactFlow } from '@xyflow/react';

import { type ElkNode } from './elkNode';

const elk = new ELK();

export const getLayoutedElements = async (nodes: ElkNode[], edges: Edge[], options: LayoutOptions) => {
  const isHorizontal = options['elk.direction'] === 'RIGHT';
  const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
 
      // Hardcode a width and height for elk to use when layouting.
      width: 150,
      height: 50,
      position : { x: 0, y: 0 },
    })),
    edges: edges.map((e) => ({
      id: e.id,
      sources: [e.sourceHandle || e.source],
      targets: [e.targetHandle || e.target],
    })),
  };

  const layoutedGraph = await elk.layout(graph);
 
  const layoutedNodes = nodes.map((node) => {
    const layoutedNode = layoutedGraph.children?.find((lgNode) => lgNode.id === node.id);
 
    return {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: layoutedNode?.x ?? 0,
        y: layoutedNode?.y ?? 0,
      },
    };
  });
 
  return layoutedNodes;
};

export default function useLayoutNodes(options: LayoutOptions = {}) {
  const nodesInitialized = useNodesInitialized();
  const { getNodes, getEdges, setNodes, fitView } = useReactFlow<ElkNode>();


  useEffect(() => {
    if (nodesInitialized) {
      const layoutNodes = async () => {
        const layoutedNodes = await getLayoutedElements(getNodes() as ElkNode[], getEdges(), options);
 //@ts-expect-error
        if(layoutedNodes) setNodes(layoutedNodes);
        fitView();
      };
 
      layoutNodes();
    }
  }, [nodesInitialized, getNodes, getEdges, setNodes, fitView]);
 
  return null;
}
