/* import Usuario from "../../models/Usuario";
import { generarTokenConfirmacion } from '../../helpers/generar-jwt';
import { enviarCorreoConfirmacion } from '../../helpers/correos'; */
const bcryptjs = require('bcryptjs')
const pg = require('pg');
const dataConnection = require('../../database/connection');
const {  transporter } = require('../../emails/emailService');

const registerUser = async (req, res) => {
    const { email, name, country, unit, role } = req.body;


    try {
        /* // Verificar que el correo no esté registrado previamente
        let usuario = await Usuario.findOne({ correo });

        if (usuario?.confirmado) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado, si has olvidado la contraseña puedes solicitar una nueva.' });
        } */

        /*  if (!usuario) { */
        // Crear un nuevo usuario



        // Guardar el usuario en la base de datos con el estado de "no confirmado"
        /*  usuario.confirmado = false;
         await usuario.save(); */
        /*   } */
        // Generar el token de confirmación y enviar el correo electrónico de confirmación
        /*  const token = await generarTokenConfirmacion(usuario._id);
         await enviarCorreoConfirmacion(correo, token); */



        // Hashear el password
   /*      const salt = await bcryptjs.genSalt(10);
        const passWordHashed = await bcryptjs.hash(password, salt); */



        const connectionBBDD = new pg.Client(dataConnection);
        await connectionBBDD.connect((err, client) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Error trying to connect to the database, please try again.",
                });
            }

            //originales.action_drivers_019
            const query = `
        INSERT INTO tablones.tb_ap_users_des ( 
          password,
          email,
          role,
          name,
          unit,
          country,
        )
        VALUES (
         '${email}',
         '${role}',
         '${name}',
         '${unit}',
         '${country}',
        );
      `

            console.log(query)

            client.query(
                query
                , (err, results) => {

                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            message: "Error trying to register a new user, please try again.",
                        });
                    }

                    res.status(200).json(
                        results.rows[0]
                    );

                    client.end()
                }
            );
        });

        let mailOptions = {
            from: 'noreply@gruposantander.com',
            to: email,
            subject: 'Asunto del correo',
            text: 'Contenido del correo en texto plano',
            html: '<p>Contenido del correo en HTML</p>'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Correo enviado: ' + info.response);
            }
        });



        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "An error ocurred, please try again.",
        });
        return;
    }
};

module.exports = registerUser