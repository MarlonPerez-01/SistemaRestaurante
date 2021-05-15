import React, { useState } from 'react';
import Error from '../Error';

const Login = () => {
  //state para iniciar sesion
  const [usuario, setUsuario] = useState({
    nombre_usuario: '',
    contrasenia: ''
  });

  const [autenticacion, setAutenticacion] = useState({
    token: '',
    nombre_tipo_usuario: ''
  });

  const [error, setError] = useState(false);

  //Extrayendo los valores
  const { nombre_usuario, contrasenia } = usuario;

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const obtenerToken = async (usuario) => {
    const res = await fetch('http://127.0.0.1:8080/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(usuario)
    });
    const data = await res.json();
    if (data.data) {
      setError(false);
      setAutenticacion(data.data);
    } else {
      setError(true);
    }
  };

  const iniciarSesion = (e) => {
    e.preventDefault();

    //validacion de campos
    // let ej = obtenerToken(usuario);
    obtenerToken(usuario);

    // history.push("/home")
  };

  return (
    <>
      {error && (
        <div className="row mt-3">
          <Error mensaje="Error en la autenticación" />
        </div>
      )}
      <div className="row mt-3">
        <h1 className="col text-center mb-3 mt-3 text-secondary">
          Inicia Sesión
        </h1>
      </div>

      <form onSubmit={iniciarSesion}>
        <label htmlFor="nombre_usuario">Usuario</label>
        <input
          id="nombre_usuario"
          name="nombre_usuario"
          value={nombre_usuario}
          onChange={handleChange}
          type="text"
          className="form-control"
          required
        />

        <label htmlFor="contrasenia">Contraseña</label>
        <input
          id="contrasenia"
          name="contrasenia"
          value={contrasenia}
          onChange={handleChange}
          type="password"
          className="form-control"
          required
        />

        <input
          type="submit"
          value="Inicia Sesión"
          className="btn btn-primary mt-3"
        />
      </form>
    </>
  );
};

export default Login;
