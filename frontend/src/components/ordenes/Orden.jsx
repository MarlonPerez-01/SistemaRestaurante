import React from 'react';
import Detalles from './Detalles';

const Orden = ({ orden, handleEliminar }) => {
	return (
		<ul className='list-group mb-4 col-lg-4'>
			<li className='list-group-item list-group-item-primary'>
				Cliente: {orden.nombres} {orden.apellidos}
			</li>
			<Detalles detalles={orden.detalles} />
			<input
				type='submit'
				value='Eliminar'
				className='danger'
				onClick={() => handleEliminar(orden.id_venta)}
			></input>
		</ul>
	);
};

export default Orden;
