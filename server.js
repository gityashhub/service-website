const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path'); // ADD THIS at the top
const cors = require('cors');

const allowedOrigins = [
    'http://localhost:3000',
    'https://yourdomain.com' // Replace with your Hostinger domain when live
];

// ✅ CORS Setup
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
}));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname));




// POST endpoint for contact form submission
app.post('/send-inquiry', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Nodemailer transport configuration
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mpmiteshuttekar001742@gmail.com',
            pass: 'lfkxchntmoxrzkkt'
        }
    });

    const mailOptions = {
        from: 'mpmiteshuttekar001742@gmail.com',
        to: 'miteshuttekar1631@gmail.com', // admin receives this
        subject: `New Inquiry: ${subject}`,
        html: `
            <h2>New Inquiry Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong><br>${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Inquiry sent to admin successfully' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).send({ error: 'Failed to send email to admin' });
    }
});

// POST endpoint for comment-box submission
app.post('/send-comment', async (req, res) => {
    const { name, email, message } = req.body;

    // Nodemailer transport configuration
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mpmiteshuttekar001742@gmail.com',
            pass: 'lfkxchntmoxrzkkt'
        }
    });

    const mailOptions = {
        from: 'mpmiteshuttekar001742@gmail.com',
        to: 'miteshuttekar1631@gmail.com', // admin receives this
        subject: `New Comment from: ${name}`,
        html: `
            <h2>New Comment Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br>${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Inquiry sent to admin successfully' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).send({ error: 'Failed to send email to admin' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
