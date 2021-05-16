import React, { useState } from 'react';
import Editar from './Editar';

const Listado = ({ platos, eliminar, setPlatos }) => {
  const plato_edit_initial = {
    nombre: '',
    descripcion: '',
    precio: ''
  };

  const [plato_edit, set_plato_edit] = useState(plato_edit_initial);

  //pasa al state plato_edit los datos del registro seleccionado
  const editar = (id) => {
    const plato = platos.filter((plato) => plato.id_plato === id);
    set_plato_edit(...plato);
  };

  const handleEditarChange = (e) => {
    set_plato_edit({
      ...plato_edit,
      [e.target.name]: e.target.value
    });
  };

  //Llamando al endpoint para actualizar platos
  const editarPlato = async (id) => {
    try {
      //TODO: Validacion de campos

      //Peticion para actualizar
      const res = await fetch(`http://127.0.0.1:8080/platos/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({
          nombre: plato_edit.nombre,
          precio: plato_edit.precio,
          descripcion: plato_edit.descripcion
        })
      });

      //Actualizando el state del listado de platos

      const datos = await res.json();

      console.log(datos);

      setPlatos(
        platos.map((item) => (item.id_plato === id ? plato_edit : item))
      );

      //Cerrar el modal
    } catch (err) {
      console.log(err);
    }
  };

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
                    type="button"
                    className="btn btn-success"
                    data-toggle="modal"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    onClick={() => editar(plato.id_plato)}
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

      {/* Modal para editar */}
      <Editar
        id="myModal"
        className="modal fade"
        role="dialog"
        plato_edit={plato_edit}
        handleEditarChange={handleEditarChange}
        set_plato_edit={set_plato_edit}
        editarPlato={editarPlato}
      />
    </>
  );
};

export default Listado;
