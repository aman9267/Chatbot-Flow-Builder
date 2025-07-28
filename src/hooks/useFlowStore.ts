/**
 * Zustand store for managing flow state
 * Centralizes all flow-related state and actions for better maintainability
 */

import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges, Connection, NodeChange, EdgeChange } from '@xyflow/react';
import { FlowNode, FlowEdge, NodeData } from '../types';

interface FlowStore {
  // State
  nodes: FlowNode[];
  edges: FlowEdge[];
  selectedNodeId: string | null;
  
  // Actions
  setNodes: (nodes: FlowNode[]) => void;
  setEdges: (edges: FlowEdge[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (nodeData: Partial<NodeData>, position: { x: number; y: number }) => void;
  updateNodeData: (nodeId: string, data: Partial<NodeData>) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  deleteSelectedNode: () => void;
}

let nodeIdCounter = 1;

export const useFlowStore = create<FlowStore>((set, get) => ({
  // Initial state
  nodes: [],
  edges: [],
  selectedNodeId: null,

  // State setters
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  // React Flow event handlers
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    const { edges } = get();
    
    // Ensure source handle can only have one outgoing edge
    const existingEdge = edges.find(edge => 
      edge.source === connection.source && edge.sourceHandle === connection.sourceHandle
    );
    
    if (existingEdge) {
      // Remove existing edge before adding new one
      const filteredEdges = edges.filter(edge => edge.id !== existingEdge.id);
      set({
        edges: addEdge(connection, filteredEdges),
      });
    } else {
      set({
        edges: addEdge(connection, edges),
      });
    }
  },

  // Add a new node to the flow
  addNode: (nodeData, position) => {
    const newNode: FlowNode = {
      id: `node-${nodeIdCounter++}`,
      type: 'textNode',
      position,
      data: {
        type: 'text',
        label: 'Text Message',
        message: 'Enter your message here...',
        ...nodeData,
      } as NodeData,
    };

    set({
      nodes: [...get().nodes, newNode],
    });
  },

  // Update node data
  updateNodeData: (nodeId, data) => {
    set({
      nodes: get().nodes.map(node =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...data } }
          : node
      ),
    });
  },

  // Set selected node ID
  setSelectedNodeId: (nodeId) => {
    set({ selectedNodeId: nodeId });
  },

  // Delete the currently selected node
  deleteSelectedNode: () => {
    const { selectedNodeId, nodes, edges } = get();
    if (!selectedNodeId) return;

    set({
      nodes: nodes.filter(node => node.id !== selectedNodeId),
      edges: edges.filter(edge => 
        edge.source !== selectedNodeId && edge.target !== selectedNodeId
      ),
      selectedNodeId: null,
    });
  },
}));