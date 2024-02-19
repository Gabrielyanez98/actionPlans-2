import { Response, Request } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';


import Usuario from '../../models/Usuario';


const restablecerPassword = async (req: Request, res: Response)  => {

    try {
        const token = req.params.token;
        const { passwordNueva } = req.body;
        // Verificar que el token sea válido
        if (!process.env.SECRETORPRIVATEKEY) {
            res.status(400).json({ mensaje: 'Ha ocurrido un error inesperado, por favor vuelve a intentarlo, si el error persiste contacta a eventzone.contacto@gmail.com' });
            return;
        }

        const decodedToken = jwt.verify(token, process.env.SECRETORPRIVATEKEY as Secret) as JwtPayload;
        const _id = decodedToken._id;

        // Buscar al usuario por su ID
        const usuario = await Usuario.findById(_id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Este correo no está registrado en EventZone.' });
        }

        // Actualizar la contraseña del usuario

        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(passwordNueva, salt);
        usuario.confirmado = true
        await usuario.save();

        res.json({ mensaje: 'La contraseña ha sido actualizada.' });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            mensaje: 'Ha ocurrido un error inesperado' 
        });
        return;
    }
}

export default restablecerPassword