import { Response, Request } from 'express';
import bcryptjs from 'bcryptjs';

import Usuario from "../../models/Usuario";
import { generarTokenConfirmacion } from '../../helpers/generar-jwt';
import { enviarCorreoConfirmacion } from '../../helpers/correos';

interface RegistrarUsuarioRequest {
    nombre: string,
    correo: string,
    password: string
}


const registrarUsuario = async (req: Request, res: Response) => {
    const { nombre, correo, password } = req.body as RegistrarUsuarioRequest;

    try {
        // Verificar que el correo no esté registrado previamente
        let usuario = await Usuario.findOne({ correo });

        if (usuario?.confirmado) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado, si has olvidado la contraseña puedes solicitar una nueva.' });
        }

        if (!usuario) {
            // Crear un nuevo usuario
            usuario = new Usuario({
                nombre,
                correo,
                password
            });

            // Hashear el password
            const salt = await bcryptjs.genSalt(10);
            usuario.password = await bcryptjs.hash(password, salt);

            // Guardar el usuario en la base de datos con el estado de "no confirmado"
            usuario.confirmado = false;
            await usuario.save();
        }
        // Generar el token de confirmación y enviar el correo electrónico de confirmación
        const token = await generarTokenConfirmacion(usuario._id);
        await enviarCorreoConfirmacion(correo, token);

        res.json({ mensaje: 'Hemos enviado un correo electrónico de confirmación a tu cuenta.' });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
        return;
    }
};

export default registrarUsuario