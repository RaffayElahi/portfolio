const express = require('express');
const path = require('path');
const nodemailer = require("nodemailer")
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require("cors")

const app = express();
require("dotenv").config()
const port = process.env.PORT;

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://res.cloudinary.com"],
      }
    }
  }));

const formLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: 'Too many requests from this IP, please try again later.'
  });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/contact', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'Contact.html'))
})

app.get('/thanks', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'Thanks.html'))
})

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

app.use('/form', formLimiter);

app.post('/form',[
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('message').notEmpty().withMessage('Message is required')
  ],(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, message } = req.body;
    const mailOptions = {
        to: process.env.ADMIN_EMAIL, 
        subject: 'Contact Form Submission from your portfolio site',
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error:', error);
          return res.status(500).json({ errors: [{ msg: 'Failed to send email' }] });
        } else {
          console.log('Email sent:', info.response);
          res.status(200).json({ message: 'Email sent successfully' });
        }
    });
})

app.get('*', (req, res)=>{
    res.status(404).sendFile(path.join(__dirname, 'public', 'notFound.html'))
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});