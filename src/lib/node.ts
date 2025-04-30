import { Param, YarnNode } from "./types";

export function buildGraphFromNode(node: YarnNode) {
  const graph = {
    nodes: [] as any[],
    edges: [] as any[],
  };

  node.instructions.forEach((instruction, index) => {
    const nodeId = `${node.name}-${index}`;
    const params = instruction.operands || [];

    graph.nodes.push({
      id: nodeId,
      type: "yarnNode",
      data: {
        opcode: instruction.opcode,
        params: params,
        index: index,
      },
      position: { x: 0, y: index * 130 },
    });

    if (index > 0) {
      const prevNodeId = `${node.name}-${index - 1}`;
      graph.edges.push({
        id: `e${prevNodeId}-${nodeId}`,
        source: prevNodeId,
        target: nodeId,
      });
    }
  });

  return graph;
}

export function getParamType(param: Param): string {
  if ("stringValue" in param) {
    return "stringValue";
  } else if ("floatValue" in param) {
    return "floatValue";
  } else if ("boolValue" in param) {
    return "boolValue";
  } else {
    return "unknown";
  }
}

export function getParamValue(param: Param): string | number | boolean {
  if ("stringValue" in param) {
    return param.stringValue;
  } else if ("floatValue" in param) {
    return param.floatValue;
  } else if ("boolValue" in param) {
    return param.boolValue;
  } else {
    return "unknown";
  }
}
