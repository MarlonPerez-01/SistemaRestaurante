import { pool, promisePool } from '../config/db';

export const seleccionarById = async (id) => {
  try {
    const query = `SELECT pl.id_plato, pl.nombre, pl.precio, pl.descripcion, pl.imagen, pr.cantidad_disponible FROM Plato AS pl INNER JOIN Provision as pr ON pl.id_plato = pr.id_plato WHERE pl.id_plato=${pool.escape(
      id
    )} AND pl.estado = 1`;

    const data = await promisePool.query(query);
    return data[0];
  } catch (err) {
    throw err;
  }
};

export const seleccionar = async (desde, limite) => {
  try {
    const query = `SELECT pl.id_plato, pl.nombre, pl.precio, pl.descripcion, pl.imagen, pr.cantidad_disponible FROM Plato AS pl INNER JOIN Provision as pr ON pl.id_plato = pr.id_plato WHERE pl.estado = 1 LIMIT ${pool.escape(
      limite
    )} OFFSET ${pool.escape(desde)}`;

    const data = await promisePool.query(query);
    return data[0];
  } catch (err) {
    throw err;
  }
};

export const insertar = async (nuevoPlato) => {
  try {
    //obteniendo y eliminando la propiedad cantidad para que se inserte en la tabla Plato un objeto valido
    let cantidad = 0;

    if (nuevoPlato.cantidad > 0) {
      cantidad = nuevoPlato.cantidad;
      delete nuevoPlato.cantidad;
    } else {
      delete nuevoPlato.cantidad;
    }

    //Insertando los datos necesarios a la tabla Plato
    const query = `INSERT INTO Plato SET ?`;
    const data = await promisePool.query(query, nuevoPlato);

    //validando que no haya ocurrido error al insertar el plato
    const id = data[0].insertId;
    if (id) {
      const query = `INSERT INTO Provision SET id_plato = ${id}, cantidad_disponible = ${cantidad}`;
      await promisePool.query(query, nuevoPlato);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const actualizar = async (id, nuevoPlato) => {
  try {
    //obteniendo y eliminando la propiedad cantidad para que se actualice en la tabla Plato un objeto valido
    let cantidad = 0;

    if (nuevoPlato.cantidad > 0) {
      cantidad = nuevoPlato.cantidad;
      delete nuevoPlato.cantidad;
    } else {
      delete nuevoPlato.cantidad;
    }

    //Actualizando los datos necesarios a la tabla Plato
    const query = `Update Plato SET ? WHERE id_plato=${pool.escape(
      id
    )} AND estado = 1`;
    const data = await promisePool.query(query, nuevoPlato);

    // validando que no haya ocurrido error al actualizar el plato
    // const id = data[0];
    console.log(data[0].affectedRows);
    const filaActualizada = data[0].affectedRows;

    if (filaActualizada) {
      const query = `UPDATE Provision SET cantidad_disponible = ${cantidad} WHERE id_plato=${pool.escape(
        id
      )}`;
      console.log(query);
      await promisePool.query(query);
    }

    return data[0];
  } catch (err) {
    throw err;
  }
};

export const eliminar = async (id) => {
  try {
    const query = `UPDATE Plato SET estado = 0 WHERE id_plato = ${id}`;

    const data = await promisePool.query(query);
    return data[0];
  } catch (err) {
    throw err;
  }
};
