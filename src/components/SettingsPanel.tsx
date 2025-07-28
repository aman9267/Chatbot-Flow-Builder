/**
 * SettingsPanel Component
 * Displays settings for the currently selected node
 * Allows editing of node properties and provides node management actions
 */

import React, { useState, useEffect } from 'react';
import { Settings, MessageCircle, Trash2 } from 'lucide-react';
import { useFlowStore } from '../hooks/useFlowStore';

const SettingsPanel: React.FC = () => {
  const { 
    nodes, 
    selectedNodeId, 
    updateNodeData, 
    setSelectedNodeId, 
    deleteSelectedNode 
  } = useFlowStore();

  const [message, setMessage] = useState('');

  // Find the currently selected node
  const selectedNode = nodes.find(node => node.id === selectedNodeId);

  // Update local state when selected node changes
  useEffect(() => {
    if (selectedNode && 'message' in selectedNode.data) {
      setMessage(selectedNode.data.message);
    }
  }, [selectedNode]);

  // Handle message text change
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
    
    if (selectedNodeId) {
      updateNodeData(selectedNodeId, { message: newMessage });
    }
  };

  // Handle closing the settings panel
  const handleClose = () => {
    setSelectedNodeId(null);
  };

  // Handle node deletion
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this node?')) {
      deleteSelectedNode();
    }
  };

  if (!selectedNode) {
    return null;
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
        </div>
        <button
          onClick={handleClose}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          title="Close settings"
        >
          ×
        </button>
      </div>

      {/* Node Info */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-gray-700">
            {selectedNode.data.label}
          </span>
        </div>
        <p className="text-xs text-gray-500">Node ID: {selectedNode.id}</p>
      </div>

      {/* Message Settings */}
      <div className="space-y-4">
        <div>
          <label 
            htmlFor="message-input" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Message Text
          </label>
          <textarea
            id="message-input"
            value={message}
            onChange={handleMessageChange}
            placeholder="Enter the message text..."
            className="
              w-full p-3 border border-gray-300 rounded-lg resize-none
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-colors text-sm
            "
            rows={4}
          />
          <p className="text-xs text-gray-500 mt-1">
            This text will be displayed to users in the chat
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={handleDelete}
          className="
            w-full flex items-center justify-center gap-2 px-4 py-2
            text-red-600 bg-red-50 border border-red-200 rounded-lg
            hover:bg-red-100 hover:border-red-300 transition-colors
            text-sm font-medium
          "
        >
          <Trash2 className="w-4 h-4" />
          Delete Node
        </button>
      </div>

      {/* Help Text */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-600">
          💡 Connect nodes by dragging from the bottom handle to the top handle of another node
        </p>
      </div>
    </div>
  );
};

export default SettingsPanel;