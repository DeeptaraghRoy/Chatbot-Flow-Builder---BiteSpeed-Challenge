import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  addEdge,
  SelectionMode,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import "./Global.css";
import TextUpdaterNode from "../../customNodes/TextUpdaterNode.jsx";
import CustomAlert from "../../alert/CustomAlert.jsx";
import CustomTopPanel from "../../panels/CustomTopPanel.jsx";
import Sidebar from "../../panels/sidebar/Sidebar.jsx";

const flowKey = "biteSpeedFlowEx"; // This variable is used as a key to store and retrieve the flow data in the local storage.

const getNodeId = () => `dndnode_${+new Date()}`; // Generates a unique node ID based on the current timestamp.

const panOnDrag = [1, 2]; // The `panOnDrag` array with two values is used to specify the sensitivity of panning when dragging on the ReactFlow component.

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode }; // The nodeTypes Object maps the type to actual React component.

/* The `DnDFlow` component implements a drag-and-drop flow editor using the ReactFlow library. */
const DnDFlow = () => {
  // States and custom hooks setup.
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Handles Node Element clicked.
  const onNodeClick = useCallback((event, node) => {
    console.log("click node", node);
    setSelectedNode(node);
  }, []);

  const updateNodeLabel = useCallback(
    (id, label) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, label } } : node
        )
      );
    },
    [setNodes]
  );

  const maxEdgesFromSource = 1; // Set the maximum number of edges allowed from a source handle

  const { setViewport } = useReactFlow(); // Setup Viewport.

  /* The `onConnect` function is used to handle the edge connection of nodes in the ReactFlow component. */
  const onConnect = useCallback(
    (params) => {
      const sourceNodeId = params.source;
      const existingEdgesFromSource = edges.filter(
        (edge) => edge.source === sourceNodeId
      );

      if (existingEdgesFromSource.length < maxEdgesFromSource) {
        const newEdge = { ...params, markerEnd: { type: "arrow" } };
        setEdges((eds) => addEdge(newEdge, eds));
      }
    },
    [edges, setEdges]
  );

  /* The `checkEmptyTargetHandles` function iterates over the `edges` array and counts the number of edges that do not have a `targetHandle` property defined. Hence essentially checks for empty target handles */
  const checkEmptyTargetHandles = useCallback(() => {
    let emptyTargetHandles = 0;
    edges.forEach((edge) => {
      if (!edge.targetHandle) {
        emptyTargetHandles++;
      }
    });
    return emptyTargetHandles;
  }, [edges]);

  /* The `isNodeUnconnected` function is used to determine if there are any nodes in the flow that are unconnected, meaning they do not have any incoming or outgoing edges. */
  const isNodeUnconnected = useCallback(() => {
    let unconnectedNodes = nodes.filter(
      (node) =>
        !edges.find(
          (edge) => edge.source === node.id || edge.target === node.id
        )
    );

    return unconnectedNodes.length > 0;
  }, [nodes, edges]);

  /* The `onSave` function handles the logic for saving the current state of the flow in the ReactFlow component inside the Browser-Local Storage. */
  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const emptyTargetHandles = checkEmptyTargetHandles();

      if (nodes.length > 1 && (emptyTargetHandles > 1 || isNodeUnconnected())) {
        setAlert({
          message:
            "Cannot Save Flow! More than one node has an empty target handle or there are unconnected nodes.",
          variant: "error",
        });
        setTimeout(() => {
          setAlert({ message: "", variant: "" });
        }, 3000); // Removes Alert Message after 3 seconds.
      } else {
        const flow = reactFlowInstance.toObject();
        localStorage.setItem(flowKey, JSON.stringify(flow));
        setAlert({ message: "Flow Saved Successfully!", variant: "success" });
        setTimeout(() => {
          setAlert({ message: "", variant: "" });
        }, 3000); // Removes Alert Message after 3 seconds.
      }
    }
  }, [
    checkEmptyTargetHandles,
    isNodeUnconnected,
    nodes.length,
    reactFlowInstance,
  ]);

  /* The `onRestore` function is responsible for restoring a previously saved flow state from the local storage. */
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setEdges, setNodes, setViewport]);

  /* The `onDragOver` function is used to handle the drag over event when an element is being dragged over a drop target. */
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  let id = 0; // This `id` variable is initialized to keep track of the nodes being added to the ReactFlow component, so that a default label can be added with a node id.

  /* The `onDrop` function handles the drop event when an element is dropped onto the ReactFlow component. */
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getNodeId(),
        type,
        position,
        data: { label: `test message ${++id}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [id, reactFlowInstance, setNodes]
  );

  return (
    <>
      {alert.message && (
        <CustomAlert message={alert.message} variant={alert.variant} />
      )}
      <CustomTopPanel onSave={onSave} onRestore={onRestore} />
      <div className="dndflow">
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            panOnScroll
            selectionOnDrag
            panOnDrag={panOnDrag}
            selectionMode={SelectionMode.Partial}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <Background color="#ccc" variant="cross" size={3} />
            <MiniMap nodeStrokeWidth={3} zoomable pannable />
          </ReactFlow>
        </div>
        <Sidebar
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
          updateNodeLabel={updateNodeLabel}
        />
      </div>
    </>
  );
};

export default DnDFlow;
