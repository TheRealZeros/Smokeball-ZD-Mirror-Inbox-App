const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Endpoint to serve the Canvas Kit UI
app.post('/canvas', (req, res) => {
  // We will implement this in the next section
});

app.get('/', (req, res) => {
    res.send('Hello! The server is up and running.');
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/canvas', (req, res) => {
    // Initialize the counter if it's not already set
    let counter = req.body.intercom_context.counter || 0;
  
    // Check if the button was pressed
    if (req.body.input_values && req.body.input_values.increment) {
      counter += 1;
    }
  
    // Build the Canvas Kit response
    const canvas = {
      canvas: {
        content: {
          components: [
            {
              type: 'text',
              text: 'Hello World!',
              style: 'header',
            },
            {
              type: 'button',
              id: 'increment',
              label: `Counter: ${counter}`,
              action: {
                type: 'submit',
              },
            },
          ],
        },
      },
      intercom_context: {
        counter: counter,
      },
    };
  
    res.json(canvas);
  });
  