// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000; // Cloud providers assign PORT

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize SQLite database (persistent on cloud)
const dbPath = path.join(__dirname, 'riasec.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('SQLite connection error:', err.message);
    else console.log('Connected to SQLite database.');
});

// Create table for form submissions
db.run(`
    CREATE TABLE IF NOT EXISTS submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

// Test route
app.get('/', (req, res) => {
    res.send('RIASEC Backend with SQLite is running!');
});

// Route to receive form submissions
app.post('/submit', (req, res) => {
    const formData = JSON.stringify(req.body);

    const sql = `INSERT INTO submissions (data) VALUES (?)`;
    db.run(sql, [formData], function(err) {
        if (err) {
            console.error('Error saving submission:', err.message);
            return res.status(500).json({ message: 'Failed to save form data' });
        }
        res.json({ message: 'Form submitted successfully', id: this.lastID });
    });
});

// Optional: Route to fetch all submissions
app.get('/submissions', (req, res) => {
    db.all('SELECT * FROM submissions ORDER BY created_at DESC', [], (err, rows) => {
        if (err) {
            console.error('Error fetching submissions:', err.message);
            return res.status(500).json({ message: 'Failed to fetch submissions' });
        }
        res.json(rows);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
