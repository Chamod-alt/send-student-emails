
// utils/emailService.js

const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');

function generateRegistrationPDF(student) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });

    doc.fontSize(20).text('Registration Confirmation', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text(`Hello ${student.name},`);
    doc.moveDown();

    doc.text(`Thank you for registering for the class: ${student.className}`);
    doc.text(`Your Registration ID: ${student.registrationId}`);

    doc.moveDown();
    doc.text('We are excited to have you join us. For any queries, please contact us.');
     doc.text('074 23 55 798');
    doc.end();
  });
}

async function sendEmail(student) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // .env file
      pass: process.env.EMAIL_PASS, // app password or normal password 
    }
  });

  const pdfBuffer = await generateRegistrationPDF(student);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: student.email,
    subject: `🎓 Registration Confirmation - ID ${student.registrationId}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">🎉 Hello ${student.name},</h2>
        <p>Your registration for the class <strong style="color: #2196F3;">${student.className}</strong> is <strong style="color: green;">successfully completed!</strong></p>
        <p><strong>📄 Registration ID:</strong> ${student.registrationId}</p>
        <hr style="margin: 20px 0;">
        <p style="font-size: 14px; color: #777;">If you have any questions, feel free to reply to this email.</p>
        <p style="font-size: 14px; color: #555;">Best regards,<br>The Student Registration Team</p>
      </div>
    `,
    attachments: [
      {
        filename: `Registration-${student.registrationId}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      }
    ]
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
