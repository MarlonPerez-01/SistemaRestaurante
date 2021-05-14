import {
  actualizar,
  eliminar,
  insertar,
  seleccionar,
  seleccionarById
} from '../controllers/plato.controller';

import { platoSchema } from '../validators/plato.validator';
import { idSchema, intervaloSchema } from '../validators/query.validator';
import chef from '../middlewares/chef';
import admin from '../middlewares/chef';

import {
  validarBody,
  validarParams,
  validarQuery
} from '../middlewares/validaciones';

export default (app) => {
  app.get('/platos/:id', validarParams(idSchema), chef, seleccionarById);

  app.get('/platos', validarQuery(intervaloSchema), chef, seleccionar);

  app.post('/platos', validarBody(platoSchema), insertar);

  app.put(
    '/platos/:id',
    validarParams(idSchema),
    validarBody(platoSchema),
    admin,
    actualizar
  );

  app.delete('/platos/:id', validarParams(idSchema), eliminar);
};
