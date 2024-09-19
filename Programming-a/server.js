aconst express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Contact form submission endpoint
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service provider
        auth: {
            user: 'email@gmail.com', // Your email
            pass: 'pass' // Your email password
        }
    });

    const mailOptions = {
        from: email,
        to: 'email@gmail.com', // Your receiving email
        subject: `New contact form submission from ${name}`,
        text: `You received a new message from ${name} (${email}): \n\n${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ message: 'Error occurred. Please try again.' });
        } else {
            return res.status(200).send({ message: 'Message sent successfully!' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

