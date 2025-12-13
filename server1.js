require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Gmail Transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Form submission route
app.post('/submit-form', async (req, res) => {
    try {
        const data = req.body;

        // Format email content
        let emailBody = `RIASEC Form Submission\n\n`;
        emailBody += `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nInstitute: ${data.institute}\n\n`;

        Object.keys(data).forEach(key => {
            if (key.startsWith('q')) {
                emailBody += `${key}: ${data[key]}\n`;
            }
        });

        emailBody += `\nCareer Preferences\nCareer: ${data.career1 || ''}\nField: ${data.field1 || ''}\nCode: ${data.code1 || ''}\n`;

        await transporter.sendMail({
            from: `"RIASEC Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: 'New RIASEC Submission',
            text: emailBody
        });

        res.json({ success: true, message: 'Form submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to submit form' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
