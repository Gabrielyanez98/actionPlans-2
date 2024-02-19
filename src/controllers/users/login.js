const bcryptjs = require('bcryptjs')


/* import { generarJWT, generarTokenConfirmacion } from '../../helpers/generar-jwt';
import { enviarCorreoConfirmacion } from '../../helpers/correos'; */


const login = async (req, res) => {

    try {
        // Verificar que el usuario exista en la base de datos


        const connectionBBDD = new pg.Client(dataConnection);
        await connectionBBDD.connect((err, client) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Error trying to connect to the database, please try again.",
                });
            }

            //originales.action_drivers_019
            const query = "SELECT email,password" +
                "FROM tablones.tb_ap_users_des email = " +
                "'" + req.body.email + "'" +
                ";"
            let password;
            console.log(query)

            client.query(
                query
                , (err, results) => {

                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            message: "Error trying to consult plans, please try again.",
                        });
                    }
                    password = results.rows[0]
                    console.log(password)

                    client.end()
                }
            );
        });

        /*   if (!usuario) {
              res.status(400).json({ mensaje: 'Email or password wrong' });
              return; 
          } */


        /* if (!usuario.confirmado) {
            const token = await generarTokenConfirmacion(usuario._id);
            await enviarCorreoConfirmacion(email, token);
            res.status(400).json({ mensaje: `Tu cuenta no ha sido confirmada, te hemos enviado un nuevo correo de confirmación, por favor accede a tu correo ${correo} y confirma la cuenta para iniciar sesión` });
            return; 
        } */


        // Verificar que la contraseña sea correcta
        const validPassword= await bcryptjs.compare(req.body.password, password);

        if (!validPassword) {
            res.status(400).json({message: "Wrong email or password" });
            return;
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({ message: 'Login right', token })
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "An error ocurred, please try again.",
        });
    }
};

module.exports = login