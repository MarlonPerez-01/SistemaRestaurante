import {
  actualizar,
  eliminar,
  insertar,
  seleccionar
} from '../controllers/plato.controller';

import { platoSchema } from '../validators/plato.validator';
import { idSchema, intervaloSchema } from '../validators/query.validator';
import admin from '../middlewares/admin';

import {
  validarBody,
  validarParams,
  validarQuery
} from '../middlewares/validaciones';

export default (app) => {
  app.get('/platos', validarQuery(intervaloSchema), seleccionar);

  app.post('/platos', validarBody(platoSchema), admin, insertar);

  app.put(
    '/platos/:id',
    validarParams(idSchema),
    validarBody(platoSchema),
    admin,
    actualizar
  );

  app.delete('/platos/:id', validarParams(idSchema), admin, eliminar);
};
