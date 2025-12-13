const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('RIASEC Backend is running!');
});

app.post('/submit', (req, res) => {
    const formData = req.body;
    const filePath = path.join(__dirname, 'responses.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        let json = [];
        if (!err && data.length) {
            try { json = JSON.parse(data); } 
            catch (parseErr) { console.error('Error parsing JSON:', parseErr); }
        }

        json.push(formData);

        fs.writeFile(filePath, JSON.stringify(json, null, 2), (writeErr) => {
            if (writeErr) return res.status(500).json({ message: 'Failed to save form data' });
            res.json({ message: 'Form submitted successfully', data: formData });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
