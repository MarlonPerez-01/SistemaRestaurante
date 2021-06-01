import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../Header';
import * as fetchPlatos from '../../helper/fetchPlatos';
import * as fetchVentas from '../../helper/fetchVentas';
import { leerSesion } from '../../helper/autenticacion';

const Plato = () => {
  const [platos, setPlatos] = useState([]);
  const [opciones, setOpciones] = useState([]);
  const [opcionActual, setOpcionActual] = useState(0);
  const [detalles, setDetalles] = useState([]);
  const [total, setTotal] = useState(0);
  const [cantidadActual, setCantidadActual] = useState(1);
  const [cliente, setCliente] = useState({ nombres: '', apellidos: '' });
  const [alerta, setAlerta] = useState({ mostrar: false, msg: '', color: '' });

  // const [total, setTotal] = useState(0);

  const obtenerOpciones = async () => {
    const datos = await fetchPlatos.obtener();
    setPlatos(datos.data);
    const nuevasOpciones = datos.data.map((opcion) => {
      const { id_plato, nombre } = opcion;
      return { id_plato, nombre };
    });

    setOpciones(nuevasOpciones);
  };

  const nuevaOrden = (id) => {
    if (!(cliente.nombres && cliente.apellidos && detalles.length > 0)) {
      setAlerta({
        mostrar: true,
        msg: 'Por favor ingrese todos los datos',
        color: 'warning'
      });
      return;
    }

    //formato esperado por el endpoint en el objeto DetallesVenta
    const DetallesVenta = detalles.map((detalle) => {
      let { id_plato, cantidad } = detalle;
      cantidad = parseInt(cantidad);
      return { id_plato, cantidad: cantidad };
    });

    //Creacion del objeto
    const venta = {
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      DetallesVenta
    };

    //envio de la peticion post
    const sesion = leerSesion();
    fetchVentas.insertar(venta, sesion.token);
    setAlerta({
      mostrar: true,
      msg: 'La venta fue agregada exitosamente!',
      color: 'success'
    });
  };

  const agregarPlato = () => {
    const nuevoDetalle = platos.find(
      (plato) => plato.id_plato === parseInt(opcionActual)
    );

    //TODO: indicar al usuario que ya esta ese plato
    const repetido = detalles.find(
      (plato) => plato.id_plato === parseInt(opcionActual)
    );
    if (repetido || opcionActual == 0) return;

    setDetalles([...detalles, { ...nuevoDetalle, cantidad: cantidadActual }]);

    //se suma al total
    actualizarTotal(nuevoDetalle.precio, cantidadActual);
  };

  const limpiar = () => {
    setOpcionActual(0);
    setDetalles([]);
    setTotal(0);
    setCantidadActual(1);
    setCliente({ nombres: '', apellidos: '' });
    setAlerta({ mostrar: false, msg: '', color: '' });
  };

  const handleCliente = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleCantidadActual = (e) => {
    setCantidadActual(e.target.value);
  };

  const eliminar = (id) => {
    const platoEliminar = detalles.find(
      (plato) => plato.id_plato === parseInt(id)
    );

    setDetalles([...detalles].filter((plato) => plato.id_plato !== id));

    //se resta del total
    actualizarTotal(-platoEliminar.precio, platoEliminar.cantidad);
  };

  const actualizarTotal = (precio, cantidad) => {
    setTotal(total + precio * cantidad);
  };

  const history = useHistory();

  useEffect(() => {
    //redireccionar al login si no es CAJERO
    const sesion = leerSesion();

    if (sesion.existe && sesion.cargo === 'CAJERO') {
      obtenerOpciones(sesion.token);
    } else {
      history.push('/');
    }
  }, []);

  const handleSelect = (e) => {
    setOpcionActual(e.target.value);
  };

  return (
    <div>
      <Header />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <h1 className="display-4">Crear Ordenes</h1>
        </div>
        <br />
        <div className="row">
          <div className="col-3">
            <h2 className="titulo">Cliente</h2>
            <div className="form-group mb-3">
              <input
                type="text"
                name="nombres"
                value={cliente.nombres}
                placeholder="Nombre"
                className="form-control mb-2"
                autoComplete="off"
                onChange={handleCliente}
              />
              <input
                type="text"
                name="apellidos"
                value={cliente.apellidos}
                placeholder="Apellido"
                className="form-control"
                autoComplete="off"
                onChange={handleCliente}
              />
            </div>
            <br />

            <h2 className="titulo">Selección</h2>
            <div>
              <select
                onChange={handleSelect}
                className="form-select mb-2"
                value={opcionActual}
                placeholder="Search"
              >
                <option value="0">Listado de platillos</option>
                {opciones.map(({ id_plato, nombre }) => (
                  <option key={id_plato} value={id_plato}>
                    {nombre}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="cantidad"
                placeholder="Cantidad"
                className="form-control mb-2"
                onChange={handleCantidadActual}
                value={cantidadActual}
              />
              <button
                className="btn btn-success btn-block form-control mb-1"
                onClick={agregarPlato}
              >
                Agregar Plato/s
              </button>
              <button
                className="btn btn-secondary btn-block form-control"
                onClick={limpiar}
              >
                Limpiar
              </button>
            </div>
          </div>

          <div className="col-9">
            <h2 className="titulo">Detalles</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {!detalles.length ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No hay platos aún.
                    </td>
                  </tr>
                ) : (
                  detalles.map((detalle) => (
                    <tr key={detalle.id_plato}>
                      <td>{detalle.nombre}</td>
                      <td>{detalle.cantidad}</td>
                      <td>{detalle.precio}</td>
                      <td colSpan="2">
                        <input
                          type="submit"
                          className="btn btn-danger"
                          value="Eliminar"
                          onClick={() => eliminar(detalle.id_plato)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                {detalles.length >= 1 && (
                  <tr>
                    <td> </td>
                    <td> </td>
                    <td>Total: ${total.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-success mt-2"
                        onClick={nuevaOrden}
                      >
                        Nueva Orden
                      </button>
                    </td>
                  </tr>
                )}
              </tfoot>
            </table>
            {alerta.mostrar && (
              <div
                className={`alert alert-${alerta.color} text-center`}
                role="alert"
              >
                {alerta.msg}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plato;
