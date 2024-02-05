import { Response, Request } from 'express';
import bcryptjs from 'bcryptjs';

import Usuario from "../../models/Usuario";
import { generarJWT, generarTokenConfirmacion } from '../../helpers/generar-jwt';
import { enviarCorreoConfirmacion } from '../../helpers/correos';


const iniciarSesion = async (req: Request, res: Response) => {
    const { correo, password } = req.body;

    try {
        // Verificar que el usuario exista en la base de datos
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });
            return; 
        }

        if (usuario.google) {
            res.status(400).json({ mensaje: 'Esta cuenta está vinculada y se debe usar la opción de inicio de sesión con Google' });
            return; 
        }

        if (!usuario.confirmado) {
            const token = await generarTokenConfirmacion(usuario._id);
            await enviarCorreoConfirmacion(correo, token);
            res.status(400).json({ mensaje: `Tu cuenta no ha sido confirmada, te hemos enviado un nuevo correo de confirmación, por favor accede a tu correo ${correo} y confirma la cuenta para iniciar sesión` });
            return; 
        }

        if (usuario.bloqueado) {
            res.status(400).json({ mensaje: 'Este usuario ha sido bloqueado, si crees que ha sido un error contáctanos ' })
            return; 
        }

        // Verificar que la contraseña sea correcta
        const passwordValido = await bcryptjs.compare(password, usuario.password);

        if (!passwordValido) {
            res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });
            return;
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({ mensaje: 'Inicio de sesión correcto', token })
        return;
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
};

export default iniciarSesion