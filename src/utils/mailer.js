require('dotenv').config();

const nodemailer = require('nodemailer');
const { google } = require('googleapis');

//credentials

const oAuth2Client = new google.auth.OAuth2(
  process.env.MAIL_CLIENT_ID,
  process.env.MAIL_CLIENT_SECRET,
  process.env.MAIL_REDIRECT_URL,
);

oAuth2Client.setCredentials({
  refresh_token: process.env.MAIL_REFRESH_TOKEN,
});

// Function to generate OAuth2 access token
const getAccessToken = () => {
    return new Promise((resolve, reject) => {
      oAuth2Client.getAccessToken((err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  };

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USER,
        clientId: process.env.MAIL_CLIENT_ID,
        clientSecret: process.env.MAIL_CLIENT_SECRET,
        refreshToken: process.env.MAIL_REFRESH_TOKEN,
        accessToken: getAccessToken(),
    },
});

module.exports = transporter;