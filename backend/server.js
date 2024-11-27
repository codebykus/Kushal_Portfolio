const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
 
// Route for handling contact form submissions
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: 'personal1232345@gmail.com', // Your email
        pass: 'mjva zcde jyvk kxep', // Your email password or app-specific password
      },
    });

     // Email options
    const mailOptions = {
      from: email, // Sender email
      to: 'personal1232345@gmail.com', // Your email to receive the messages
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).send({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to send email. Try again later.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
