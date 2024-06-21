import classes from "./App.module.css";
import { ReactFlowProvider } from "reactflow";
import DnDFlow from "./components/flows/dnDFlow/DnDFlow";

function App() {
  return (
    <div className={classes.App}>
      {/* The `<ReactFlowProvider>` component is a part of the React Flow library, which provides a way to manage the state and configuration of a flow. The Drag And Drop Flow has been wrapped with this. */}
      <ReactFlowProvider>
        <DnDFlow />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
