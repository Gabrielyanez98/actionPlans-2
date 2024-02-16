const express = require('express')
const cors = require('cors')
const routerPlans = require('../routes/plans')
const routerUsers = require('../routes/users')
/* import { dbConnection } from '../database/config';
import eventosRouter from '../routes/eventos';
import usuariosRouter from '../routes/usuarios'; */


class Server {

    constructor() {
        this.app = express()
        this.port = Number(process.env.PORT) || 8080;

      /*   this.paths = {
            eventos: '/api/evento',
            usuarios: '/api/usuario',
        } */
        this.paths = {
            plans: '/api/plans',
            users: '/api/users'
        }

        //Middlewares
        this.middlewares()

        //Rutas app
        this.routes()
    }

    middlewares() {
        //Cors
        this.app.use(cors())

        //Lectura y parseo body
        this.app.use(express.json())

        this.app.use(express.urlencoded({ extended: true, limit: '100mb' }))

        /* this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 }
        })) */
    }

    routes() {
        this.app.use(this.paths.plans, routerPlans)
        this.app.use(this.paths.users, routerUsers)
       /*  this.app.use(this.paths.eventos, eventosRouter)
        this.app.use(this.paths.usuarios, usuariosRouter) */
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running on port ", this.port)
        })
    }

}

module.exports = { Server };