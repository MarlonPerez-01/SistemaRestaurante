import React from 'react';
import Detalles from './Detalles';

const Orden = ({ orden }) => {
	return (
		<div>
			<span>Cliente: </span>
			<span>
				{' '}
				{orden.nombres} {orden.apellidos}{' '}
			</span>
			<Detalles detalles={orden.detalles} />
		</div>
	);
};

export default Orden;
