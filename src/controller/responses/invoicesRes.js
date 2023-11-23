import { OAuth2Client } from "google-auth-library";
import { getHTMLInvoice } from "../methods/getHTMLInvoice.js";
import nodemailer from 'nodemailer';
import User from "../../models/User.js";

const CLIENT_ID = '689024350629-hoibo37qfivbkub11q5e8d9me53qu7ml.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REFRESH_TOKEN = "1//04CjMunBdND2ACgYIARAAGAQSNwF-L9IrYYXhg1OSAlpQjqBQ3kwoNPHwNWXwshJOX1vWXggxBWTN3q80WCnUM-xf2Ahh3V9HqAk";

const authUrl = new OAuth2Client({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});
authUrl.setCredentials({ refresh_token: REFRESH_TOKEN})

const accessToken = authUrl.getAccessToken();

export const sendInvoice = async (req, res) => {
    const { nit, name, cartItems, totalCost, totalCostCurrency = "BOB", userId } = req.body;

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
      host: 'smtp.gmail.com'
    });

    const user = await User.findById(userId);

    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(currentDate);
    
    const mailOptions = {
      from: 'thelikoecommerce@gmail.com',
      to: user.email,
      subject: 'The Liko - Invoice',
      html: getHTMLInvoice(invoiceNumber, formattedDate, totalCost, nit, name, cartItems, totalCostCurrency),
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