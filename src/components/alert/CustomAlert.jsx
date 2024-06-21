import React from "react";
import styles from "./CustomAlert.module.css";

/**
 * The CustomAlert component displays a message with a specified variant style.
 * @returns The CustomAlert component is being returned, which renders a div element with a message
 * inside it. The div has a dynamic class name based on the variant prop passed to the component.
 */
const CustomAlert = ({ message, variant }) => {
  return <div className={`${styles.alert} ${styles[variant]}`}>{message}</div>;
};

export default CustomAlert;
