import React from 'react';
import Detalles from './Detalles';
import '../../css/index.css';

const Orden = ({ orden, eliminar }) => {

  const hora = orden.fecha.split(/[T.]/);
  
  return (
    <div className="col-3">
      <div className="card shadow p-3 mb-5 bg-body rounded">
        <div className="image-order"></div>
        <div className="card-body">
          <h3 className="card-title">Orden</h3>
          <h6 className="card-subtitle mb-2 text-muted">Cliente: {orden.nombres} {orden.apellidos}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Hora: {hora[1]}</h6>
          <Detalles detalles={orden.detalles} /><br />
          <input
            type="submit"
            className="btn btn-success"
            value="Orden Completada"
            onClick={() => eliminar(orden.id_venta)}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Orden;