/**
 * Header Component
 * Top navigation bar with app title and save functionality
 * Provides flow validation and save actions
 */
import { toPng } from "html-to-image";

import React from "react";
import { Save, AlertCircle, CheckCircle, Bot } from "lucide-react";
import { useFlowStore } from "../hooks/useFlowStore";
import { validateFlow, serializeFlow } from "../utils/validation";

const Header: React.FC = () => {
  const { nodes, edges } = useFlowStore();

  const handleExportJSON = () => {
    const dataStr = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "flow.json";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Handle save action with validation
  const handleSave = () => {
    const validation = validateFlow(nodes, edges);

    if (!validation.isValid) {
      // Show validation errors
      alert(`Cannot save flow:\n\n${validation.errors.join("\n")}`);
      return;
    }

    // Serialize and save the flow
    const flowData = serializeFlow(nodes, edges);

    // In a real app, you would send this to your backend
    console.log("Saving flow:", flowData);

    // For demo purposes, show success message
    alert("Flow saved successfully!");

    // You could also download as JSON file:
    // const blob = new Blob([JSON.stringify(flowData, null, 2)], { type: 'application/json' });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'chatbot-flow.json';
    // a.click();
  };

  const validation = validateFlow(nodes, edges);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Chatbot Flow Builder
            </h1>
            <p className="text-sm text-gray-600">
              Design your conversational flows
            </p>
          </div>
        </div>

        {/* Flow Status and Save Button */}
        <div className="flex items-center gap-4">
          {/* Flow Status Indicator */}
          <div className="flex items-center gap-2">
            {validation.isValid ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">Flow Valid</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-orange-600">
                  {validation.errors.length} Issue(s)
                </span>
              </>
            )}
          </div>

          {/* Node/Edge Count */}
          <div className="text-sm text-gray-500">
            {nodes.length} nodes • {edges.length} connections
          </div>
          {/* Export Button */}
          <button
            onClick={handleExportJSON}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
              ${
                validation.isValid
                  ? "bg-blue-500 text-white hover:bg-blue-600 shadow-sm hover:shadow-md"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
            `}
            disabled={!validation.isValid}
            title={
              validation.isValid ? "Save flow" : validation.errors.join(". ")
            }
          >
            <Save className="w-4 h-4" />
            Export JSON
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
