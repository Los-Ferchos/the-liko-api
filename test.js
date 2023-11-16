import express from 'express';
import nodemailer from 'nodemailer';


const app = express();
const port = 3000;


// Define a route to generate and send the invoice
app.get('/send-invoice', async (req, res) => {
  // Generate a random invoice number
  const invoiceNumber = generateInvoiceNumber();

  // Create an email transporter (Update with your email configuration)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'thelikomaster45@gmail.com',
      pass: 'qbkynjidsfmdkmyk',
    },
  });

  // Render the invoice template with sample data (you can replace this with your actual data)
  const invoiceHtml = await renderInvoiceTemplate({
    invoiceNumber,
    invoiceDate: new Date().toLocaleDateString(),
    totalAmount: '$100.00',
    receiverNIT: '123456789',
    receiverName: 'John Doe',
    products: [
      { title: 'Product 1', quantity: 2, unitaryCost: '$50.00', totalCost: '$100.00' },
      // Add more products as needed
    ],
  });

  // Define the email options
  const mailOptions = {
    from: 'thelikomaster45@gmail.com',
    to: 'fabianromcla1304@gmail.com', // Update with the user's email address
    subject: 'Invoice for Your Recent Purchase',
    html: invoiceHtml,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(`Error sending the invoice: ${error}`);
    }
    res.send('Invoice sent successfully!');
  });
});

// Helper function to generate a random invoice number
function generateInvoiceNumber() {
  const randomNumbers = Math.floor(Math.random() * 10000);
  const randomLetters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
    String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
    String.fromCharCode(65 + Math.floor(Math.random() * 26));

  return `${randomNumbers}-${randomLetters}`;
}

// Helper function to render the invoice template
async function renderInvoiceTemplate(data) {
  return new Promise((resolve, reject) => {
    app.render('invoice', data, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
