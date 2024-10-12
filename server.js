const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 8080; 

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json()); // Parse JSON bodies

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'main','website.html'));
});
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'main', 'dashboard.html'));
});
 app.post('/login', (req, res) => {
    const { username, password } = req.body;

// Email sending endpoint
app.post('/send-email', (req, res) => {
    const { date, time, username } = req.body;
   

    // Set up transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service
        auth: {
            user: process.env.EMAIL_USER, // Use the environment variable
            pass: process.env.EMAIL_PASS, // Use the environment variable
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, // Use the environment variable
        to: 'revuparu8@gmail.com', // Change to the recipient's email
        subject: 'Scheduled Call',
        text: `User ${username} has scheduled a call for ${date} at ${time}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.status(500).send('Error sending email.');
        }
        console.log('Email sent:', info.response);
        res.send('Email sent successfully!');
    });
});

// Listen on port and 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});


