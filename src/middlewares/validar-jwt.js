/* import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UsuarioModel from '../models/Usuario';
import { UsuarioDocument } from '../interfaces/UsuarioDocument';

const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      mensaje: 'Parece que no has iniciado sesión, por favor prueba a iniciar sesión. Si el error persiste contáctanos escribiendo a eventzone.contact@gmail.com.',
    });
  }

  try {
    const decodedToken = jwt.verify(token as string, process.env.SECRETORPRIVATEKEY as string) as JwtPayload;
    const _id = decodedToken._id;

    // leer el usuario que corresponde al uid
    const usuario: UsuarioDocument | null = await UsuarioModel.findById(_id);

    if (!usuario) {
      return res.status(401).json({
        mensaje:
          'Parece que no has iniciado sesión, para esta acción es necesario iniciar sesión, por favor vuelve a intentarlo, si el error persiste contáctanos por favor escribiendo a eventzone.contact@gmail.com.',
      });
    }

    // Verificar si el id tiene estado true
    if (!usuario.estado) {
      return res.status(401).json({
        mensaje:
          'El usuario se encuentra eliminado, por favor vuelve a intentarlo, si el error persiste contáctanos por favor escribiendo a eventzone.contact@gmail.com.',
      });
    }

    if (usuario.bloqueado) {
      return res.status(401).json({
        mensaje:
          'El usuario se encuentra bloqueado, para solicitar una reclamación contáctanos escribiendo a eventzone.contact@gmail.com..',
      });
    }
    req.usuario = usuario ;

    return next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      mensaje: 'Ha ocurrido un error inesperado, por favor vuelve a intentarlo.',
    });
  }
};

export default validarJWT; */