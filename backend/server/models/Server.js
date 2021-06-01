import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//Rutas

import PlatoRoutes from '../routes/plato.routes';
import VentaRoutes from '../routes/venta.routes';
import LoginRoutes from '../routes/login.routes';

export class Server {
  constructor() {
    this.port = parseInt(process.env.PORT) || 8080;
    this.app = express();

    this.middlewares();
    this.routes();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }

  middlewares() {
    this.app.use(
      cors({ origin: ['http://localhost:3000', 'http://localhost:5000'] })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
  }

  routes() {
    PlatoRoutes(this.app);
    VentaRoutes(this.app);
    LoginRoutes(this.app);
  }
}
