import { getHTMLInvoice } from "../methods/getHTMLInvoice";

const sendInvoice = async (req, res) => {
    const { nit, name, cartItems, totalCost } = req.body;

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

    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(currentDate);
    
    const mailOptions = {
      from: 'thelikoecommerce@gmail.com',
      to: 'correoejemplo12353@gmail.com',
      subject: 'Invoice for Your Recent Purchase',
      html: getHTMLInvoice(invoiceNumber, formattedDate, totalCost, nit, name, cartItems, "BOB"),
    };
  
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