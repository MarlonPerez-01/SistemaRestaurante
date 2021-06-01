import React from 'react';
import { useHistory } from 'react-router-dom';

const Header = () => {
  //se usa para manejar el redireccionamiento
  const history = useHistory();

  const cerrarSesion = () => {
    sessionStorage.clear();
    history.push('/');
  };
  const estilos = {
    maxWidth: '100%',
    maxHeight: '2em'
  };
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">
            Peruvian Restaurant
          </span>
          <input
            className="btn text-white"
            type="button"
            value="Cerrar Sesión"
            onClick={cerrarSesion}
          />
        </div>
      </nav>
    </>
  );
};

export default Header;

/*
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
            <img
              src={process.env.PUBLIC_URL + '/logo-res2.png'}
              alt="logo"
              className="img-fluid"
              style={estilos}
            />

          <input
            className="btn"
            type="button"
            value="Cerrar Sesión"
            onClick={cerrarSesion}
          />
        </div>
      </nav>

*/