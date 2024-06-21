import React from "react";
import classes from "./CustomTopPanel.module.css";

/**
 * The CustomTopPanel component renders a header with buttons for saving changes and restoring flow.
 * @returns The `CustomTopPanel` component is being returned in which the
 * `onSave` and `onRestore` functions are passed as props to handle the click events on the buttons.
 */
const CustomTopPanel = ({ onSave, onRestore }) => {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div className={classes.navMenu}>
          <ul className={classes.navList}>
            <li className={classes.navItem}>
              <button onClick={onSave}>Save Changes</button>
            </li>
            <li className={classes.navItem}>
              <button onClick={onRestore}>Restore Flow</button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default CustomTopPanel;
