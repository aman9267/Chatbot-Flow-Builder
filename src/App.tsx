/**
 * Main App Component
 * Orchestrates the entire Chatbot Flow Builder interface
 * Manages layout and component composition
 */

import React from "react";
import "@xyflow/react/dist/style.css";
import Header from "./components/Header";
import NodePanel from "./components/NodePanel";
import SettingsPanel from "./components/SettingsPanel";
import FlowCanvas from "./components/FlowCanvas";
import { useFlowStore } from "./hooks/useFlowStore";

function App() {
  const { selectedNodeId } = useFlowStore();

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Here is header componetns */}
      <Header />

      {/* my main container */}
      <div className="flex-1 flex overflow-hidden">
        {/* left side bar chat and settign pannel */}
        {selectedNodeId ? <SettingsPanel /> : <NodePanel />}

        {/* My White board and main canvas */}
        <FlowCanvas />
      </div>
    </div>
  );
}

export default App;
