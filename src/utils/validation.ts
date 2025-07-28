/**
 * Flow validation utilities
 * Provides validation logic to ensure flow integrity before saving
 */

import { FlowNode, FlowEdge, ValidationResult } from '../types';

/**
 * Validates the current flow state
 * Checks for incomplete flows where multiple nodes have no outgoing edges
 */
export const validateFlow = (nodes: FlowNode[], edges: FlowEdge[]): ValidationResult => {
  const errors: string[] = [];

  // If there are no nodes, flow is valid (empty state)
  if (nodes.length === 0) {
    return { isValid: true, errors: [] };
  }

  // If there's only one node, it's valid regardless of edges
  if (nodes.length === 1) {
    return { isValid: true, errors: [] };
  }

  // Find nodes with no outgoing edges
  const nodesWithoutOutgoingEdges = nodes.filter(node => {
    return !edges.some(edge => edge.source === node.id);
  });

  // If more than one node has no outgoing edges, it's an incomplete flow
  if (nodesWithoutOutgoingEdges.length > 1) {
    errors.push(
      `Incomplete flow: ${nodesWithoutOutgoingEdges.length} nodes have no outgoing connections. ` +
      `Only one end node is allowed.`
    );
  }

  // Check for isolated nodes (nodes with no connections at all)
  const isolatedNodes = nodes.filter(node => {
    const hasIncoming = edges.some(edge => edge.target === node.id);
    const hasOutgoing = edges.some(edge => edge.source === node.id);
    return !hasIncoming && !hasOutgoing && nodes.length > 1;
  });

  if (isolatedNodes.length > 0) {
    errors.push(
      `Found ${isolatedNodes.length} isolated node(s) with no connections.`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Converts flow to JSON format for saving
 */
export const serializeFlow = (nodes: FlowNode[], edges: FlowEdge[]) => {
  return {
    nodes: nodes.map(node => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: node.data,
    })),
    edges: edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
    })),
  };
};