const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000; // Use Railway or cloud PORT if available

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
    res.send('RIASEC Backend is running!');
});

// Route to receive form submissions
app.post('/submit', (req, res) => {
    const formData = req.body;
    const filePath = path.join(__dirname, 'responses.json');

    // Read existing data
    fs.readFile(filePath, 'utf8', (err, data) => {
        let json = [];
        if (!err && data.length) {
            try { 
                json = JSON.parse(data); 
            } catch (parseErr) { 
                console.error('Error parsing JSON:', parseErr); 
            }
        }

        // Add new submission
        json.push(formData);

        // Save back to file
        fs.writeFile(filePath, JSON.stringify(json, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error saving submission:', writeErr);
                return res.status(500).json({ message: 'Failed to save form data' });
            }

            res.json({ message: 'Form submitted successfully', data: formData });
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
