require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

/* =========================
   Middleware
========================= */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

/* =========================
   Gmail Transport (SERVER ONLY)
========================= */
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/* =========================
   Form Submission Route
========================= */
app.post('/submit-form', async (req, res) => {
    try {
        const data = req.body;

        /* -------- Format Email -------- */
        let emailBody = `
RIASEC FORM SUBMISSION

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Institute: ${data.institute}

--------------------------------
RIASEC ANSWERS
--------------------------------
`;

        Object.keys(data).forEach(key => {
            if (key.startsWith('q')) {
                emailBody += `${key}: ${data[key]}\n`;
            }
        });

        emailBody += `
--------------------------------
Career Preferences
--------------------------------
Career: ${data.career1 || ''}
Field: ${data.field1 || ''}
Code: ${data.code1 || ''}
`;

        /* -------- Send Email -------- */
        await transporter.sendMail({
            from: `"RIASEC Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: 'New RIASEC Test Submission',
            text: emailBody
        });

        res.json({
            success: true,
            message: 'Form submitted successfully'
        });

    } catch (error) {
        console.error('Submission Error:', error);
        res.status(500).json({
            success: false,
            message: 'Submission failed'
        });
    }
});

/* =========================
   Start Server
========================= */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
