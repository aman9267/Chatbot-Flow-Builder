/**
 * FlowCanvas Component
 * Main canvas component that renders the React Flow interface
 * Handles drag and drop, node creation, and flow interactions
 */

import React, { useCallback, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  ReactFlowInstance,
} from "@xyflow/react";
import { useFlowStore } from "../hooks/useFlowStore";
import { NODE_TYPES } from "../config/nodeTypes";
import TextNode from "./TextNode";

// Register custom node types
const nodeTypes = {
  textNode: TextNode,
};

const FlowCanvas: React.FC = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    setSelectedNodeId,
  } = useFlowStore();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  // Handle canvas click to deselect any selected node
  const onCanvasClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  // Handle node drop event
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (!type || !reactFlowInstance.current) {
        return;
      }

      const nodeTypeConfig = NODE_TYPES[type];
      if (!nodeTypeConfig) {
        return;
      }

      // Get the bounding rectangle of the React Flow wrapper
      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const position = reactFlowInstance.current.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Add the new node at the drop position
      addNode(nodeTypeConfig.defaultData, position);
    },
    [addNode]
  );

  // Handle drag over to allow dropping
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handle React Flow instance initialization
  const onInit = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
  }, []);

  return (
    <div className="flex-1 h-full" ref={reactFlowWrapper}>
      <ReactFlow
        id="flow-canvas"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onPaneClick={onCanvasClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
        deleteKeyCode={["Backspace", "Delete"]}
        multiSelectionKeyCode={null}
        panOnScroll
        selectionOnDrag={false}
        connectionLineStyle={{
          strokeWidth: 2,
          stroke: "#3B82F6",
        }}
        defaultEdgeOptions={{
          style: {
            strokeWidth: 2,
            stroke: "#6B7280",
          },
          type: "smoothstep",
        }}
      >
        {/* Background pattern */}
        <Background color="#E5E7EB" gap={20} size={1} variant="dots" />

        {/* Zoom and pan controls */}
        <Controls
          className="bg-white border border-gray-200 shadow-lg"
          showInteractive={false}
        />

        {/* Mini map for navigation */}
        <MiniMap
          className="bg-white border border-gray-200 shadow-lg"
          zoomable
          pannable
          nodeColor={(node) => {
            const nodeType = NODE_TYPES[node.data?.type];
            return nodeType?.color || "#6B7280";
          }}
        />
      </ReactFlow>
    </div>
  );
};

// Wrap with ReactFlowProvider
const FlowCanvasProvider: React.FC = () => (
  <ReactFlowProvider>
    <FlowCanvas />
  </ReactFlowProvider>
);

export default FlowCanvasProvider;
