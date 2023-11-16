import { Router } from "express";
import { addMultipleToCart, addToCart, deleteAllCartItems, deleteCartItem, editCartItemQuantity } from "../controller/requests/cartItemReq.js";
import { getCartItems } from "../controller/responses/cartItemRes.js";
import nodemailer from 'nodemailer';
import { OAuth2Client } from "google-auth-library";

const cartItemsRouter = Router();

cartItemsRouter.post('/cart', addToCart);
cartItemsRouter.post('/multiplecart', addMultipleToCart);
cartItemsRouter.get('/cart/:userId', getCartItems);
cartItemsRouter.put('/cart/:userId/:productId', editCartItemQuantity);
cartItemsRouter.delete('/cart/:userId', deleteAllCartItems);
cartItemsRouter.delete('/cart/:userId/:productId', deleteCartItem);

const CLIENT_ID = '689024350629-26q1vf3a7mbmek5ump7mtnks152kgvhm.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REFRESH_TOKEN = "1//04j8NNgW7E2lxCgYIARAAGAQSNwF-L9IrzEH6kwTRML5H4oKxp5Q7aez1XshoBV8PT5YAXruTBT_re_l-HKsQCsgioYNCpZsC04E";


const authUrl = new OAuth2Client({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});
authUrl.setCredentials({ refresh_token: REFRESH_TOKEN})

const accessToken = authUrl.getAccessToken();

cartItemsRouter.get('/send-invoice', async (req, res) => {
  // Generate a random invoice number
  const invoiceNumber = generateInvoiceNumber();

  // Create an email transporter (Update with your email configuration)
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

  // HTML content for the invoice (you can replace this with your actual data)
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
    console.log(info)
    res.send('Invoice sent successfully!' + info);
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

export default cartItemsRouter;