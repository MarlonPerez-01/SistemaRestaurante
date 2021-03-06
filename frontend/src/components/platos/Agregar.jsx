import React from 'react';

const Agregar = ({ plato, insertar, handleAgregarChange }) => {
  return (
    <>
      <div className="row">
        <h3 className="col mb-4 mt-4">Nuevo plato</h3>
      </div>
      <form>
        <div className="form-group">
          <label className="form-label" htmlFor="nombre">
            Nombre:
          </label>
          <input
            id="nombre"
            name="nombre"
            value={plato.nombre}
            onChange={handleAgregarChange}
            type="text"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="descripcion">
            Descripcion:
          </label>
          <input
            id="descripcion"
            name="descripcion"
            value={plato.descripcion}
            onChange={handleAgregarChange}
            type="text"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="precio">
            Precio:
          </label>
          <input
            id="precio"
            name="precio"
            value={plato.precio}
            onChange={handleAgregarChange}
            type="number"
            className="form-control"
            required
          />
        </div>

        <input
          type="button"
          value="Agregar"
          className="btn btn-primary mt-3 w-100"
          onClick={insertar}
        />
      </form>
    </>
  );
};

export default Agregar;
