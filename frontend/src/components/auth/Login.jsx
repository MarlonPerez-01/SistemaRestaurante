import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../../css/auth.css';

import Error from '../Error';
import { almacenarSesion, leerSesion } from '../../helper/autenticacion';

const Login = () => {
  //initial state
  const usuarioInitialState = {
    nombre_usuario: '',
    contrasenia: ''
  };

  //states
  const [usuario, setUsuario] = useState(usuarioInitialState);
  const [error, setError] = useState(false);

  //Extrayendo valores del state
  const { nombre_usuario, contrasenia } = usuario;

  //Manejando los inputs del login
  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  //se usa para manejar el redireccionamiento
  const history = useHistory();

  //obtener token mediante peticion post
  const obtenerToken = async (usuario) => {
    const res = await fetch('http://127.0.0.1:8080/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(usuario)
    });
    const datos = await res.json();

    //Almacenar el token y cargo en caso de ser validas las credenciales
    if (datos.data) {
      setError(false);
      almacenarSesion(datos.data.token, datos.data.nombre_tipo_usuario);
      redireccionar(datos.data.nombre_tipo_usuario);
    } else {
      setError(true);
    }

    //eliminar las credeciales del state
    setUsuario(usuarioInitialState);
  };

  const iniciarSesion = (e) => {
    e.preventDefault();

    //TODO: validacion de campos

    obtenerToken(usuario);
  };

  //redireccionar segun el cargo
  const redireccionar = (cargo) => {
    if (cargo === 'ADMIN') {
      console.log('Es ADMIN');
      history.push('platos');
    } else if (cargo === 'CAJERO') {
      console.log('Es CAJERO');
      history.push('ventas');
    } else if (cargo === 'CHEF') {
      console.log('Es CHEF');
      history.push('ordenes');
    } else {
      console.log('desconocido');
      history.push('/');
    }
  };

  useEffect(() => {
    //redireccionar a la vista correspondiente si existe una sesion
    const sesion = leerSesion();
    sesion.existe && redireccionar(sesion.cargo);

    return () => {
      setUsuario(usuarioInitialState);
    };
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row no-gutter">
          <div
            className="d-none d-md-flex col-md-4 col-lg-6 bg-image"
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + '/background.jpg'
              })`
            }}
          />
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    {error && (
                      <div className="row mt-3">
                        <Error mensaje="Error en la autenticación" />
                      </div>
                    )}
                    <h3 className="login-heading mb-4">
                      Bienvenido, Inicia Sesión
                    </h3>
                    <form onSubmit={iniciarSesion}>
                      <div className="form-label-group">
                        <input
                          id="nombre_usuario"
                          name="nombre_usuario"
                          value={nombre_usuario}
                          onChange={handleChange}
                          type="text"
                          placeholder="Usuario"
                          className="form-control"
                          autocomplete="off"
                          required
                        />
                      </div>
                      <div className="form-label-group">
                        <input
                          id="contrasenia"
                          name="contrasenia"
                          value={contrasenia}
                          onChange={handleChange}
                          type="password"
                          className="form-control"
                          placeholder="Contraseña"
                          autocomplete="off"
                          required
                        />
                      </div>
                      <input
                        type="submit"
                        value="Inicia Sesión"
                        className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold w-100"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
