const login = require('../controllers/users/login');
const registerUser = require('../controllers/users/registerUser');
/* import  validarJWT  from '../middlewares/validar-jwt'; */


const Router = require('express')
const routerUsers = Router();


routerUsers.post('/login', login)
routerUsers.post('/register', registerUser)


/* router.patch('/', [
    validarJWT,
], actualizarPassword) */



module.exports = routerUsers
