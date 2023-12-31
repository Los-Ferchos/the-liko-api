import { OAuth2Client } from "google-auth-library";
import { getHTMLInvoice } from "../methods/getHTMLInvoice.js";
import nodemailer from 'nodemailer';
import User from "../../models/User.js";

const CLIENT_ID = process.env.CLIENT_ID_GOOGLE;
const CLIENT_SECRET = process.env.CLIENT_SECRET_GOOGLE;
const REFRESH_TOKEN = process.env.TOKEN_GOOGLE;

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