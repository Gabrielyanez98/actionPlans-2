import  validarJWT  from '../middlewares/validar-jwt';
import {
 
    login,
    registerUser,
} from '../controllers/users/index';

const Router = require('express')
const routerUsers = Router();

/* 
router.get('/', obtenerUsuariosConEventos) */

routerUsers.post('/login', login)



routerUsers.post('/register', registerUser)


/* router.patch('/', [
    validarJWT,
], actualizarPassword) */





module.exports = routerUsers
