const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

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
            id: "primary-1",
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

  // Updated canvas in response to the submit action
  const updatedCanvas = {
    canvas: {
      content: {
        components: [
          {
            type: "text",
            text: "Thank you for clicking the button!",
          },
          {
            type: "button",
            label: "Another Action",
            action: {
              type: "submit",
              url: "https://e4dbad28-8462-43f6-a204-461978eeb5e8-00-2zlteizau659m.janeway.replit.dev/submit",
            },
          },
        ],
      },
    },
    event: {
      type: "completed", // Optional: Indicate that the action is complete
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
