import React, { useEffect, useState } from 'react';
import Header from '../Header';
import * as fetchPlatos from '../../helper/fetchPlatos';
import * as fetchVentas from '../../helper/fetchVentas';

const Plato = () => {
  const [platos, setPlatos] = useState([]);
  const [opciones, setOpciones] = useState([]);
  const [opcionActual, setOpcionActual] = useState(0);
  const [detalles, setDetalles] = useState([]);
  const [total, setTotal] = useState(0);
  const [cantidadActual, setCantidadActual] = useState(0);
  const [cliente, setCliente] = useState({ nombres: '', apellidos: '' });

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
    //TODO: informar al usuario que falta llenar campos
    if (cliente.nombres && cliente.apellidos && detalles.length >= 0) {
      console.log('se puede enviar');
    } else {
      console.log('no se puede enviar');
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
    fetchVentas.insertar(venta);
    console.log('nueva orden:', venta);
  };

  const agregarPlato = () => {
    const nuevoDetalle = platos.find(
      (plato) => plato.id_plato === parseInt(opcionActual)
    );

    //TODO: indicar al usuario que ya esta ese plato
    const repetido = detalles.find(
      (plato) => plato.id_plato === parseInt(opcionActual)
    );
    if (repetido) return;

    setDetalles([...detalles, { ...nuevoDetalle, cantidad: cantidadActual }]);

    //se suma al total
    sumarTotal(nuevoDetalle.precio, cantidadActual);
  };

  const handleCliente = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleCantidadActual = (e) => {
    setCantidadActual(e.target.value);
  };

  const eliminar = (id) => {
    console.log('eliminado');
    //TODO: quitar del total
  };

  const sumarTotal = (precio, cantidad) => {
    setTotal(total + precio * cantidad);
  };

  useEffect(() => {
    obtenerOpciones();
  }, []);

  const handleSelect = (e) => {
    setOpcionActual(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="row">
        <h1 className="col mb-4 mt-4 text-secondary">Crear Ordenes</h1>
      </div>
      <div className="row">
        <div className="col-3">
          <h2>Cliente</h2>
          <div className="form-group mb-3">
            <input
              type="text"
              name="nombres"
              value={cliente.nombres}
              placeholder="Nombre"
              className="form-control mb-2"
              onChange={handleCliente}
            />
            <input
              type="text"
              name="apellidos"
              value={cliente.apellidos}
              placeholder="Apellido"
              className="form-control"
              onChange={handleCliente}
            />
          </div>

          <h2>Selección</h2>
          <div>
            <select
              onChange={handleSelect}
              className="form-select mb-2"
              value={opcionActual}
              placeholder="Search"
            >
              <option defaultValue>Listado de platillos</option>
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
            />
            <button
              className="btn btn-primary btn-block form-control"
              onClick={agregarPlato}
            >
              Agregar Plato/s
            </button>
          </div>
        </div>

        <div className="col-9">
          <h2>Detalles</h2>
          <table className="table table-striped text-secondary">
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
              <tr>
                <td> </td>
                <td> </td>
                <td>Total: ${total.toFixed(2)}</td>
                <td>
                  <button className="btn btn-primary mt-2" onClick={nuevaOrden}>
                    Nueva Orden
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
          {/* !detalles.length */}
        </div>
      </div>
    </>
  );
};

export default Plato;
