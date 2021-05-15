import React, { useEffect, useState } from 'react';
import Error from '../Error';
import Orden from './Orden';

const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [mensaje, setMensaje] = useState('Cargando...');

  const obtenerOrdenes = async () => {
    const res = await fetch('http://127.0.0.1:8080/ventas', {
      method: 'GET',
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
    const data = await res.json();

    setOrdenes(data.data);

    if (!data.data.length > 0) {
      setMensaje('No hay ordenes');
    }
  };

  useEffect(() => {
    obtenerOrdenes();
  }, []);

  const eliminar = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8080/ventas/${id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      });

      let ordenesActualizadas = [...ordenes].filter(
        (orden) => orden.id_venta !== id
      );
      setOrdenes(ordenesActualizadas);

      //En caso que se eliminen todas las ordenes se mostrara este mensaje
      if (!ordenesActualizadas.length > 0) setMensaje('No hay ordenes');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="row">
        <h1 className="col text-center mb-4 mt-4 text-secondary">
          Listado de ordenes
        </h1>
      </div>
      {ordenes.length > 0 && (
        <div className="row">
          {ordenes.map((orden) => (
            <Orden key={orden.id_venta} orden={orden} eliminar={eliminar} />
          ))}
        </div>
      )}
      {!ordenes.length > 0 && <Error mensaje={mensaje} />}
    </>
  );
};

export default Ordenes;
