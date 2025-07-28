# Chatbot-Flow-Builder

A **visual chatbot flow builder** built with **React** and **React Flow**, designed to create and manage conversational flows through an intuitive drag-and-drop interface. This project allows users to build sequences of text messages, connect them visually, and define dynamic conversation paths.

---

## 🔧 Tech Stack

- **React** (with TypeScript)
- **React Flow** – for flow visualization and node interactions
- **Tailwind CSS** *(optional, for UI styling)*
- **Framer Motion / Lottie** *(optional, for animations)*

---

## ✨ Features

- 🧩 **Text Message Nodes**  
  Drag and drop text message nodes to build flows visually.

- 🔗 **Edge Connection**  
  Connect nodes with directional edges to define the order of execution.

- 🎯 **Custom Handles**  
  - **Source Handle**: Allows only **one** outgoing edge.  
  - **Target Handle**: Can accept **multiple** incoming edges.

- ⚙️ **Settings Panel**  
  Select a node to edit its message content in the settings panel.

- 📚 **Nodes Panel**  
  A draggable toolbox that currently includes the Text Message node and is built to support more types in the future.

- 💾 **Save with Validation**  
  Validates the flow structure before saving:
  - Shows an error if **more than one node exists** and **more than one has no outgoing edge**.

---

## 📸 Preview

> *(Add a screenshot or screen recording if available)*  
![Chatbot Flow Builder Screenshot](your-screenshot-link-here)

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/aman9267/Chatbot-Flow-Builder.git
cd Chatbot-Flow-Builder
