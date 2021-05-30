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
    maxHeight: '4em'
  };
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">
            <img
              src={process.env.PUBLIC_URL + '/logo-res.png'}
              alt="logo"
              className="img-fluid"
              style={estilos}
            />
          </span>
          <input
            className="btn btn-primary"
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
