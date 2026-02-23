import { type Node } from '@xyflow/react';

export type ElkNodeData = {
  label: string;
  sourceHandles: { id: string }[];
  targetHandles: { id: string }[];
};

export type ElkNode = Node<ElkNodeData, 'elk'>;