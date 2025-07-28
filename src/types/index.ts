/**
 * Type definitions for the Chatbot Flow Builder
 * These types ensure type safety and provide a foundation for extensibility
 */

import { Node, Edge } from '@xyflow/react';

// Base node data interface that all node types should extend
export interface BaseNodeData {
  type: string;
  label: string;
}

// Text node specific data
export interface TextNodeData extends BaseNodeData {
  type: 'text';
  message: string;
}

// Union type for all node data types (extensible for future node types)
export type NodeData = TextNodeData;

// Custom node type with our data
export type FlowNode = Node<NodeData>;

// Custom edge type
export type FlowEdge = Edge;

// Node type configuration for extensibility
export interface NodeTypeConfig {
  type: string;
  label: string;
  defaultData: Partial<NodeData>;
  color: string;
  icon?: string;
}

// Flow validation result
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}