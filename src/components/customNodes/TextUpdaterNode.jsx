import { Handle, Position } from "reactflow";
import classes from "./TextUpdaterNode.module.css";
import favIco from "../../assets/icons/favIco.png";
import whatsappLogo from "../../assets/icons/whatsappLogo.png";

/* This is the style object for the customizing the handles. Handles accepts styling only in this object format */
const handleStyle = {
  borderWidth: "2px",
  borderColor: "white",
  backgroundColor: "#64748b",
  width: "10px",
  height: "10px",
};

/* `TextUpdaterNode` is a custom Node Component that takes two props, `data` and `selected` sent internally by React Flow. */
const TextUpdaterNode = ({ data, selected }) => {
  return (
    /* Dynamically sets a border styling based on `selected` prop which is passed when a node is selected */
    <div
      className={`${classes.textUpdaterNode} ${
        selected ? classes.selection : ""
      }`}
    >
      {/* The `<Handle>` component is used to create a handle for connecting edges in a React Flow. This is the target handle of the `TextUpdaterNode`. */}
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={handleStyle}
      />
      {/* This is defining the structure of the content inside a custom node component, `TextUpdaterNode`. */}
      <div className={classes.nodeContent}>
        <div className={classes.nodeHeader}>
          <div className={classes.headerTitle}>
            <img src={favIco} alt="favIco" className={classes.fav} />
            <div>Send Message</div>
          </div>
          <img
            src={whatsappLogo}
            alt="whatsappIcon"
            className={classes.whatsapp}
          />
        </div>
        <div className={classes.nodeBody}>
          <div className={classes.nodeLabel}>{data.label}</div>
        </div>
      </div>
      {/* This defines the source handle of the `TextUpdaterNode`. */}
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={handleStyle}
      />
    </div>
  );
};

export default TextUpdaterNode;
