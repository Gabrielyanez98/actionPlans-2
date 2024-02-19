import { Response, Request } from 'express';
import Usuario from '../../models/Usuario';
import bcryptjs from 'bcryptjs';

const actualizarPassword = async (req: Request, res: Response) => {

    try {

        const usuario = req.usuario;

        const { passwordPerfilActual, passwordPerfilNueva } = req.body;

        if(!usuario){
            res.status(400).json({ mensaje: 'Es necesario iniciar sesión para actualizar la contraseña, si crees que es un error contactanos escribiendo a eventzone.contacto@gmail.com' });
            return;
        }

        // Buscar el usuario por ID
        let user = await Usuario.findById(usuario._id);

        if (!user) {
            res.status(400).json({ mensaje: 'Parece que este usuario no está registrado en EventZone, si crees que es un error contactanos escribiendo a eventzone.contacto@gmail.com' });
            return;
        }

        // Verificar si la contraseña actual coincide
        const passwordCoincide = await bcryptjs.compare(passwordPerfilActual, user.password);

        if (!passwordCoincide) {
            return res.status(400).json({ mensaje: 'La contraseña actual no es correcta.' });
        }

        // Generar un hash de la nueva contraseña
        const hashedPassword = await bcryptjs.hash(passwordPerfilNueva, 10);

        // Actualizar la contraseña en la base de datos
        user.password = hashedPassword;
        await user.save();

        res.json({ mensaje: 'La contraseña ha sido actualizada' });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Ha habido un error' });
        return;
    }
};

export default actualizarPassword