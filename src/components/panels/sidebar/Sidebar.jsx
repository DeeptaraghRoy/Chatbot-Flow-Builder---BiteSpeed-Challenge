import React, { useEffect, useState } from "react";
import MessageSettings from "./MessageSettingsPanel.jsx";
import DraggableNode from "./DraggableNodesPanel.jsx";

/* This is the `Sidebar` component that takes three props: `selectedNode`, `updateNodeLabel`, and `setSelectedNode`. */
const Sidebar = ({ selectedNode, updateNodeLabel, setSelectedNode }) => {
  const [text, setText] = useState("");

  /* The `useEffect` hook is used to update the `text` state whenever the `selectedNode` prop changes. This auto populates the textarea accordingly. */
  useEffect(() => {
    if (selectedNode) {
      setText(selectedNode.data.label || "");
    }
  }, [selectedNode]);

  /* Updates the text value and node label based on user input. */
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setText(newValue);
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, newValue);
    }
  };

  /* The `onDragStart` function sets data and effect allowed for a drag event in React Flow. */
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    /* The `<aside>` element in the `Sidebar` component is conditionally rendering either the `MessageSettings` component or the `DraggableNode` component based on the value of the
    `selectedNode` prop. */
    <aside>
      {selectedNode ? (
        <MessageSettings
          text={text}
          handleInputChange={handleInputChange}
          setSelectedNode={setSelectedNode}
        />
      ) : (
        <DraggableNode onDragStart={onDragStart} />
      )}
    </aside>
  );
};

export default Sidebar;
