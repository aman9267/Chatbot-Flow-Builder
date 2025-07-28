/**
 * NodePanel Component
 * Displays available node types that can be dragged onto the canvas
 * Extensible design allows for easy addition of new node types
 */

import React from 'react';
import { MessageCircle, Plus } from 'lucide-react';
import { NODE_TYPES } from '../config/nodeTypes';

const NodePanel: React.FC = () => {
  // Handle drag start - set the node type being dragged
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Nodes</h2>
        <p className="text-sm text-gray-600">
          Drag nodes to the canvas to build your chatbot flow
        </p>
      </div>

      <div className="space-y-2">
        {Object.values(NODE_TYPES).map((nodeType) => (
          <div
            key={nodeType.type}
            className="
              flex items-center gap-3 p-3 rounded-lg border-2 border-dashed border-gray-300
              cursor-grab hover:border-blue-400 hover:bg-blue-50 transition-all duration-200
              active:cursor-grabbing active:scale-95
            "
            draggable
            onDragStart={(e) => onDragStart(e, nodeType.type)}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: nodeType.color }}
            >
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-800">{nodeType.label}</div>
              <div className="text-xs text-gray-500">Drag to canvas</div>
            </div>
            <Plus className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default NodePanel;