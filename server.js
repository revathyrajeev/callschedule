const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 10000;

// Middleware for serving static files and parsing JSON
app.use(express.static('public'));
app.use(bodyParser.json());

// Route to serve the login page (website.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'website.html'));
});

// Route to handle sending emails when a call is scheduled
app.post('/send-email', (req, res) => {
    const { date, time, username } = req.body;

    // Email transport configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'thyrev96@gmail.com', // Replace with your email
            pass: '417R347a',  // Replace with your email password or app password
        },
    });

    const mailOptions = {
        from: 'thyrev96@gmail.com',
        to: 'revuparu8@gmail.com',
        subject: 'Call Schedule Notification',
        text: `Hi ${username}, your call has been scheduled for ${date} at ${time}.`,
    };

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
    console.log(`Server is running on http://localhost:${PORT}`);
});
