export enum FlowDirection {
  Source,
  Sink,
}

export enum FlowDomain {
  Audio,
  Colibri,
  h26x,
  USB
}

export interface Flow {
  label: string;
  name: string;
  domain: FlowDomain;
  direction: FlowDirection;
  routeId: string;
  routeChoices: string[];
  tags: string[];
  fullName: string;
  //id: string;
  parent: string | null;
}

export interface FlowMap {
  [key: string]: Flow;
}

export function areFlowsCompatible(flow1: Flow, flow2: Flow): boolean {
  if (flow1.parent === flow2.parent) {
    return false; // flows from the same item are not compatible
  }
  if (flow1.domain !== flow2.domain) {
    return false;
  } 
  if (flow1.direction === flow2.direction) {
    return false;
  } 
  // if both tags are empty, consider them compatible
  if (flow1.tags.length === 0 && flow2.tags.length === 0) {
    return true;
  } 
  // for now, just check if they have any tags in common
  return flow1.tags.some(tag => flow2.tags.includes(tag));
}

export function getFlowName(flowId1: string, flowId2: string): string {
  return `edge-${flowId1}-${flowId2}`;
}

export interface Item {
  name: string;
  id: string;
  flowIds: string[];
}

export interface Kit {
  items: Item[];
  flows: FlowMap;
}
