const sendInvoice = async (req, res) => {
    const { userId } = req.params;

    const invoiceNumber = generateInvoiceNumber();
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'thelikoecommerce@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        accessToken,
        refreshToken: REFRESH_TOKEN
      },
      name: 'localhost',
      host: 'smtp.gmail.com'
    });
  
    const invoiceHtml = `<html>
      <head>
        <style>
          /* Add your CSS styles here */
        </style>
      </head>
      <body>
        <h1>Invoice</h1>
        <p>Invoice Number:</p>
        <!-- Add more HTML content as needed -->
      </body>
    </html>`;
  
    // Define the email options
    const mailOptions = {
      from: 'thelikoecommerce@gmail.com',
      to: 'correoejemplo12353@gmail.com', // Update with the user's email address
      subject: 'Hello',
      html: invoiceHtml,
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(`Error sending the invoice: ${error}`);
      }
      res.send('Invoice sent successfully!' + info);
    });
  };
  

  const generateInvoiceNumber = () => {
    const randomNumbers = Math.floor(Math.random() * 10000);
    const randomLetters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
        String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
        String.fromCharCode(65 + Math.floor(Math.random() * 26));

    return `${randomNumbers}-${randomLetters}`;
}