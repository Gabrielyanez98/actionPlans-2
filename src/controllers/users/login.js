const bcryptjs = require('bcryptjs')


/* import { generarJWT, generarTokenConfirmacion } from '../../helpers/generar-jwt';
import { enviarCorreoConfirmacion } from '../../helpers/correos'; */


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar que el usuario exista en la base de datos
        /* const usuario = await Usuario.findOne({ email }); */

        if (!usuario) {
            res.status(400).json({ mensaje: 'Email or password wrong' });
            return; 
        }


        /* if (!usuario.confirmado) {
            const token = await generarTokenConfirmacion(usuario._id);
            await enviarCorreoConfirmacion(email, token);
            res.status(400).json({ mensaje: `Tu cuenta no ha sido confirmada, te hemos enviado un nuevo correo de confirmación, por favor accede a tu correo ${correo} y confirma la cuenta para iniciar sesión` });
            return; 
        } */


        // Verificar que la contraseña sea correcta
        const passwordValido = await bcryptjs.compare(password, usuario.password);

        if (!passwordValido) {
            res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });
            return;
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({ mensaje: 'Login right', token })
        return;
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
};

module.exports = login