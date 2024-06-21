import React from "react";
import backLogo from "../../../assets/icons/arrow_left_back_icon.png";
import classes from "./MessageSettingsPanel.module.css";

/* `MessageSettingsPanel` is a child component that takes three props as parameters from `Sidebar.jsx`: `text`, `handleInputChange`, and `setSelectedNode`. */
const MessageSettingsPanel = ({ text, handleInputChange, setSelectedNode }) => {
  return (
    /* This defines the structure of the Message Settings Panel. */
    <>
      <div className={classes.msgHeader}>
        <img
          src={backLogo}
          alt="backLogo"
          onClick={() => setSelectedNode(null)}
        />
        Message
      </div>
      <div className={classes.msgContainer}>
        <label htmlFor="msg">Text</label>
        <div>
          <textarea
            id="msg"
            name="msg"
            rows="4"
            cols="25"
            value={text}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </>
  );
};

export default MessageSettingsPanel;
