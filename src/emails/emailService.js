const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'mailintra.isban.gs.corp',
  port:  25,
  secure: false, // true for  465, false for other ports
  auth: {
      user: 'noreply@gruposantander.com',
      pass: '' // Aquí va tu contraseña
  }
});

module.exports =  transporter;