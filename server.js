const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const app = express();

app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Railway sets this automatically
  ssl: { rejectUnauthorized: false }          // Required for Railway
});

// Create table (run once)
pool.query(`
CREATE TABLE IF NOT EXISTS riasec_submissions (
    id SERIAL PRIMARY KEY,
    data JSONB,
    submitted_at TIMESTAMP DEFAULT NOW()
);
`);

app.post("/submit-riasec", async (req, res) => {
    const data = req.body;
    try {
        await pool.query("INSERT INTO riasec_submissions(data) VALUES($1)", [data]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
