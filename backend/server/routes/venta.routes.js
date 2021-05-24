import {
  seleccionar,
  insertar,
  eliminar
} from '../controllers/venta.controller';

import { ventaSchema } from '../validators/venta.validator';
import { idSchema, intervaloSchema } from '../validators/query.validator';
import cajero from '../middlewares/cajero';
import chef from '../middlewares/chef';

import {
  validarBody,
  validarParams,
  validarQuery
} from '../middlewares/validaciones';

export default (app) => {
  app.get('/ventas', validarQuery(intervaloSchema), seleccionar);

  app.post('/ventas', validarBody(ventaSchema), cajero, insertar);

  app.delete('/ventas/:id', validarParams(idSchema), chef, eliminar);
};
