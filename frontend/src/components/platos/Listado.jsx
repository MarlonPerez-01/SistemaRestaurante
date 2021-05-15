import React from 'react';

const Listado = ({ platos, eliminar, actualizar }) => {
  let productsState = [];
  return (
    <>
      <h3 className="text-secondary">Listado</h3>

      <table className="table table-striped text-secondary">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {!platos.length ? (
            <tr>
              <td colSpan="5" className="text-center">
                No hay platos aún.
              </td>
            </tr>
          ) : (
            platos.map((plato) => (
              <tr key={plato.id_plato}>
                <td>{plato.nombre}</td>
                <td>{plato.precio}</td>
                <td>{plato.descripcion}</td>
                <td colSpan="2">
                  <button
                    className="btn btn-success"
                    onClick={() => actualizar(plato.id_plato)}
                  >
                    Editar
                  </button>
                  {' | '}
                  <button
                    className="btn btn-danger"
                    onClick={() => eliminar(plato.id_plato)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default Listado;
