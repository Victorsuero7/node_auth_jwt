import { Router, urlencoded } from "express";
import { json } from "stream/consumers";

// import express from "express";
const express = require("express");

// Estructurea de la configuracion
interface Options {
    port?: number;
    routes: Router;
}

export class Server {
    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    // Se aplica la configuracion quedebe ser pasada
    constructor(options: Options) {
        const { port = 3100, routes } = options;

        this.port = port;
        this.routes = routes
    }

    async start() {

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true}))


        // Asignar rutas
        this.app.use(this.routes)

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);

            console.log("env", process.env.PORT);
        });
    }
}
