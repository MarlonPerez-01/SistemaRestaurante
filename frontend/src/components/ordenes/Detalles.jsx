import React from 'react';

const Detalles = ({ detalles }) => {
	return (
		<div>
			{detalles.map((detalle) => (
				<ul key={detalle.id_detalle_venta}>
					<li>{detalle.nombre}</li>
				</ul>
			))}
		</div>
	);
};

export default Detalles;
