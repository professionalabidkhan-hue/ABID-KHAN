const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit-riasec", (req, res) => {
    const formData = req.body;

    console.log("RIASEC Form Data Received:", formData);

    // Later you can save this to:
    // - Database (MongoDB / MySQL)
    // - Google Sheet via API
    // - CSV / Excel file

    res.json({
        success: true,
        message: "Your form has been submitted successfully"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
