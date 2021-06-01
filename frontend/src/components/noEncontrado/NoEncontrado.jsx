import React from 'react';
import '../../css/index.css';

function App() {
  return (
    <>
      <div className="container" id="mainContainer">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-6">
            <img src="" alt="" />
            <h3><strong>404</strong></h3><h4> Pagina no encontrada.</h4><br />
            <p>La URL que fue buscada no exite.<p className="text-muted"> Intentelo de nuevo.</p></p>
          </div>
          <div className="col-4">
            <img src="https://www.google.com/images/errors/robot.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;