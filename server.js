// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Temporary in-memory storage (resets when server restarts)
let submissions = [];

// Route to handle form submissions
app.post('/submit', (req, res) => {
  submissions.push(req.body);
  console.log('New submission:', req.body);
  res.send('Form submitted successfully!');
});

// Route to view all submissions
app.get('/submissions', (req, res) => {
  res.json(submissions);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
