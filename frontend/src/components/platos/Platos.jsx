import React, { useEffect, useState } from 'react';
import Error from '../Error';
import Agregar from './Agregar';
import Listado from './Listado';
// import Plato from './Plato';

const Platos = () => {
  //Initial states
  const platoInitial = {
    nombre: '',
    descripcion: '',
    precio: ''
  };

  //states
  const [platos, setPlatos] = useState([]);
  const [plato, setPlato] = useState(platoInitial);
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState('Cargando...');

  //handleChange
  const handleAgregarChange = (e) => {
    setPlato({
      ...plato,
      [e.target.name]: e.target.value
    });
  };

  //Peticiones fetch
  const obtenerPlatos = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8080/platos`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      });

      const datos = await res.json();

      setPlatos(datos.data);

      if (!datos.data.length > 0) {
        setMensaje(datos.msg || 'No hay platos');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const eliminar = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8080/platos/${id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      });

      let platosActualizado = [...platos].filter(
        (plato) => plato.id_plato !== id
      );
      setPlatos(platosActualizado);
    } catch (err) {
      console.log(err);
    }
  };

  const actualizar = async (id) => {
    console.log(id);
  };

  const insertar = async (e) => {
    e.preventDefault();

    //validacion de campos

    //peticion POST
    const res = await fetch('http://127.0.0.1:8080/platos', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(plato)
    });

    const datos = await res.json();

    //TODO: mostrar error en caso que exista
    if (res.status >= 200 && res.status <= 399) {
      setError(false);
      setPlato(platoInitial);

      //Agregando al state que tiene todos los platos
      setPlatos([...platos, datos.data]);
    } else {
      // setMensaje(datos.data.msg);
      setError(true);
    }
  };

  useEffect(() => {
    obtenerPlatos();
  }, []);

  return (
    <>
      <div className="row">
        <h1 className="col text-center mb-4 mt-4 text-secondary">Platillos</h1>
      </div>
      {/* {platos.length > 0 && ( */}
      <div className="row">
        <div className="col">
          <Agregar
            plato={plato}
            insertar={insertar}
            handleAgregarChange={handleAgregarChange}
          />
        </div>
        <div className="col-8">
          <Listado
            platos={platos}
            eliminar={eliminar}
            actualizar={actualizar}
            setPlatos={setPlatos}
          />
        </div>
      </div>

      {/* {!platos.length > 0 && <Error mensaje={mensaje} />} */}
    </>
  );
};

export default Platos;
