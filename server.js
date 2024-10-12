const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'main')));

// Serve the login page (website.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main', 'website.html'));
});

// Route to handle sending emails
app.post('/send-email', async (req, res) => {
    const { date, time, username } = req.body;

    // Set up the Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use any service, such as Gmail or an SMTP server
        auth: {
            user: process.env.EMAIL_USER,  // Email from .env file
            pass: process.env.EMAIL_PASS   // Password from .env file
        }
    });

    // Mail options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'revuparu8@gmail.com',  // Replace with recipient's email
        subject: 'Scheduled Call Confirmation',
        text: `Hi ${username}, your call has been scheduled for ${date} at ${time}.`
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        res.send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email.');
    }
});

// Start the server on port 10000
app.listen(10000, () => {
    console.log('Server is running on port 10000');
});
