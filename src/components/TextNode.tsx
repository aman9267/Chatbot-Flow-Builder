/**
 * TextNode Component
 * Represents a text message node in the flow
 * Handles rendering, selection, and connection points
 */

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { MessageCircle } from 'lucide-react';
import { TextNodeData } from '../types';
import { useFlowStore } from '../hooks/useFlowStore';

const TextNode: React.FC<NodeProps<TextNodeData>> = ({ data, selected, id }) => {
  const { setSelectedNodeId } = useFlowStore();

  const handleNodeClick = () => {
    setSelectedNodeId(id);
  };

  return (
    <div
      className={`
        relative bg-white rounded-lg shadow-md border-2 transition-all duration-200 cursor-pointer
        min-w-[200px] max-w-[300px] p-4 hover:shadow-lg
        ${selected 
          ? 'border-blue-500 shadow-blue-200' 
          : 'border-gray-200 hover:border-gray-300'
        }
      `}
      onClick={handleNodeClick}
    >
      {/* Target Handle - Multiple incoming edges allowed */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-gray-400 border-2 border-white hover:bg-blue-500 transition-colors"
      />

      {/* Node Header */}
      <div className="flex items-center gap-2 mb-2">
        <MessageCircle className="w-4 h-4 text-blue-500" />
        <span className="text-sm font-medium text-gray-700">{data.label}</span>
      </div>

      {/* Node Content */}
      <div className="text-sm text-gray-600 break-words">
        {data.message || 'Enter your message here...'}
      </div>

      {/* Source Handle - Only one outgoing edge allowed */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-gray-400 border-2 border-white hover:bg-blue-500 transition-colors"
      />

      {/* Selection indicator */}
      {selected && (
        <div className="absolute -inset-1 bg-blue-500 rounded-lg opacity-20 pointer-events-none" />
      )}
    </div>
  );
};

export default TextNode;