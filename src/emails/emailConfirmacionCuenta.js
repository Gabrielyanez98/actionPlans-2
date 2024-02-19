import transporter from "./emailService";

const emailConfirmacionCuenta = async (correo, token) => {
    const mensaje = {
      from: process.env.GMAIL_USER,
      to: correo,
      subject: 'Confirma tu cuenta',
      html: `
        <h1>Your account has been created</h1>
        <p>Para confirmar tu cuenta, haz click <a href="${process.env.FRONTEND_URL}/confirmar-cuenta/${token}">aquí</a></p>
      `,
    };
  
    try {
      await transporter.sendMail(mensaje);
      console.log('Correo de confirmación enviado');
    } catch (error) {
      console.log(error);
      throw new Error('Error al enviar el correo de confirmación');
    }
  };

  export {
    emailConfirmacionCuenta
  }