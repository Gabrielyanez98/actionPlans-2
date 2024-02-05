import jwt, { Secret } from 'jsonwebtoken';
import Usuario from '../models/Usuario';
import { UsuarioDocument } from '../interfaces/UsuarioDocument';



const generarJWT = (_id: string = ''): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    const payload = { _id };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY as Secret,
      {
        expiresIn: '10y',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('Ha ocurrido un error inesperado, por favor vuelve a intentarlo, si el error persiste contacta a eventzone.contacto@gmail.com');
        } else {
          resolve(token);
        }
      }
    );
  });
};

const generarTokenConfirmacion = async (usuarioId: string): Promise<string> => {
  try {
    const token = await jwt.sign(
      { id: usuarioId },
      process.env.SECRETORPRIVATEKEY as Secret,
      {
        expiresIn: '1h',
      }
    );

    // Guardar el token de confirmación en la base de datos
    const usuario: UsuarioDocument | null = await Usuario.findById(usuarioId);
    if (usuario) {
      usuario.tokenConfirmacion = token;
      await usuario.save();
      return token;
    } else {
      throw new Error('No se encontró el usuario');
    }
  } catch (error) {
    console.log(error);
    throw new Error('Ha ocurrido un error inesperado, por favor vuelve a intentarlo, si el error persiste contacta a eventzone.contacto@gmail.com');
  }
};

export { generarJWT, generarTokenConfirmacion };