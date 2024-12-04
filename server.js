const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { MongoClient } = require("mongodb");
const PORT = 3000;

let hostURL =
  "https://e4dbad28-8462-43f6-a204-461978eeb5e8-00-2zlteizau659m.janeway.replit.dev/";

// In-memory variable to track click count globally
let counter = 0;

app.use(bodyParser.json());

// Initialize Endpoint
app.post("/initialize", (req, res) => {
  console.log("Initialize request received:", req.body);

  // Simplified Canvas Response for Testing Purposes
  const canvas = {
    canvas: {
      content: {
        components: [
          {
            type: "text",
            text: "Welcome",
            style: "header",
            align: "center",
          },
          {
            type: "text",
            text: "To a very sophisticated Intercom App",
            style: "muted",
            align: "center",
          },
          {
            type: "button",
            id: "start",
            label: "Click Me!",
            style: "primary",
            action: {
              type: "submit",
            },
          },
        ],
      },
    },
  };

  // Set content type and status code, and send the response
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(canvas);
});

// Submit Endpoint to handle button click actions
app.post("/submit", (req, res) => {
  console.log("Submit request received:", req.body);

  // Extract component_id from the request body
  const componentId = req.body.component_id;

  // Increment the global counter if "clicker" button was clicked
  if (componentId === "clicker") {
    counter += 1; // Use the global `counter` variable
  }

  if (componentId === "reset") {
    counter = 0;
  }

  // Updated canvas in response to the submit action
  const updatedCanvas = {
    canvas: {
      content: {
        components: [
          {
            type: "text",
            text: "Welcome",
            style: "header",
            align: "center",
          },
          {
            type: "text",
            text: "OMG IT CHANGED",
            style: "muted",
            align: "center",
          },
          {
            type: "button",
            id: "primary-2",
            label: "Don't Click Me...",
            style: "primary",
            disabled: true,
            action: {
              type: "submit",
            },
          },
          {
            type: "button",
            id: "clicker",
            label: "Clicker",
            style: "secondary",
            action: {
              type: "submit",
            },
          },
          {
            type: "text",
            id: "click-count",
            text: `Clicker Counter: ${counter}`,
            style: "muted",
            align: "center",
          },
          {
            type: "button",
            id: "reset",
            label: "Reset clicks",
            style: "secondary",
            action: {
              type: "submit",
            },
          },
        ],
      },
    },
  };

  // Log the response before sending it
  console.log("Sending Submit response:", JSON.stringify(updatedCanvas));

  // Set content type and status code, and send the response
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(updatedCanvas);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
