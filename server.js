const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 10000; // Render will provide the PORT

// Middleware to serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Route to serve the login page (website.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'website.html'));
});

// Route to handle sending emails when a call is scheduled
app.post('/send-email', (req, res) => {
    const { date, time, username } = req.body;

    // Configure Nodemailer transport with environment variables
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Environment variable for Gmail user
            pass: process.env.EMAIL_PASS, // Environment variable for Gmail password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender address
        to: 'revuparu8@gmail.com',     // Recipient email address
        subject: 'Call Schedule Notification',
        text: `Hi ${username}, your call has been scheduled for ${date} at ${time}.`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email.');
        } else {
            console.log('Email sent:', info.response);
            res.send('Email notification sent successfully.');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
