# Chatbot Flow Builder

Live Demo Link: [https://chatbotflowbuilder-bitespeed-task.netlify.app/](https://chatbotflowbuilder-bitespeed-task.netlify.app/)

![ReactFlowDemo](https://github.com/DeeptaraghRoy/Chatbot-Flow-Builder---BiteSpeed-Challenge/assets/105920603/0b3b7d3a-2060-4fb7-815b-4ca9b6acfe19)

This project is a simple React application built with [React Flow](https://reactflow.dev/). It demonstrates the implementation of a chatbot flow builder with drag-and-drop nodes, allowing connections to define the order of message execution.

## Features

1. **Text Node**
   - Supports only one type of message (Text Message).
   - Multiple Text Nodes can exist in one flow.
   - Nodes are added to the flow by dragging and dropping from the Nodes Panel.
2. **Nodes Panel**
   - Houses all types of Nodes that the Flow Builder supports.
   - Currently includes only the Message Node, but designed to be extensible for future node types.
3. **Edge**
   - Connects two Nodes together.
4. **Source Handle**
   - The source of a connecting edge.
   - Can only have one edge originating from a source handle.
5. **Target Handle**
   - The target of a connecting edge.
   - Can have more than one edge connecting to a target handle.
6. **Settings Panel**
   - Replaces the Nodes Panel when a Node is selected.
   - Includes a text field to edit the text of the selected Text Node.
7. **Save Button**
   - Button to save the flow.
   - Displays an error if there are multiple Nodes and any Node has an empty target handle.
8. **Restore Button**
   - Button to restore the flow.

## Setup and Installation

First, clone the repository to your local machine:

```bash
git clone https://github.com/DeeptaraghRoy/Chatbot-Flow-Builder---BiteSpeed-Challenge.git
```

## Navigate into the project directory:

```bash
cd Chatbot-Flow-Builder---BiteSpeed-Challenge
```

## Install the project dependencies:

```bash
npm install
```

OR, to install while disabling protection

```bash
npm install --force
```

## To start the project in local machine:

```bash
npm run dev
```

The application should now be locally hosted on http://localhost:5173.

## Deployment

The project can be deployed on any hosting service that supports Node.js applications. Examples of such services include Heroku, Vercel, and Netlify. Please refer to the respective platform's documentation for deploying React applications.

## Contributing

If you want to contribute to this project, you're always welcome! Please fork the repository and create a pull request with your changes.
