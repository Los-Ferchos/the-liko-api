import nodemailer from 'nodemailer';

const CLIENT_ID = '689024350629-hoibo37qfivbkub11q5e8d9me53qu7ml.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REFRESH_TOKEN = "1//04CjMunBdND2ACgYIARAAGAQSNwF-L9IrYYXhg1OSAlpQjqBQ3kwoNPHwNWXwshJOX1vWXggxBWTN3q80WCnUM-xf2Ahh3V9HqAk";

import { OAuth2Client } from "google-auth-library";
import { getHTMLemailVerification } from '../methods/getHTMLemailVerification.js';
const authUrl = new OAuth2Client({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});
authUrl.setCredentials({ refresh_token: REFRESH_TOKEN})

const accessToken = authUrl.getAccessToken();

/**
 * Sends a verification email to the specified email address.
 * @param {string} email - The email address to send the verification email to.
 * @param {string} verificationCode - The verification code to include in the email.
 * @returns {boolean} - Returns true if the email was sent successfully, false otherwise.
 */
export const sendVerificationEmail = (email, verificationCode) => {
    try {
        sendEmail(email, verificationCode);
        return true;
    }
    catch (error) {
        return false;
    }
}

/**
 * Sends an email with the provided verification code.
 * 
 * @param {string} to - The recipient's email address.
 * @param {string} verificationCode - The verification code to be included in the email.
 * @returns {void}
 */
const sendEmail = (to, verificationCode) => {
    const mailOptions = {
      from:' thelikoecommerce@gmail.com',
      to,
      subject: 'Verification code',
      html: getHTMLemailVerification(verificationCode)
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email send:', info.response);
      }
    });
  };

/**
 * The transporter object used for sending emails.
 * @type {Transporter}
 */
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
  
  