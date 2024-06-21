import React from "react";
import msgLogo from "../../../assets/icons/msgLogo.png";

/* `DraggableNodePanel` is a child component that takes a prop `onDragStart` from `Sidebar.jsx`. The `<div>` element is draggable and triggers the `onDragStart` event handler when
dragged. The `onDragStart` event handler calls the `onDragStart` function passed as a prop with the event object and the string "textUpdater" as arguments. */
const DraggableNodePanel = ({ onDragStart }) => {
  return (
    /* This defines the structure of the Nodes Panel. */
    <div
      className="dndnode"
      onDragStart={(event) => onDragStart(event, "textUpdater")}
      draggable
    >
      <img src={msgLogo} alt="msgNode" />
      <p>Messages</p>
    </div>
  );
};

export default DraggableNodePanel;
