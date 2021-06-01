import React from 'react';

const Detalles = ({ detalles }) => {
	return (
		<>
		<table className="table table-hover">                            
			<thead>
				<tr>
					<th scope="col">Platillo</th>
					<th scope="col">#</th>
				</tr>
			</thead>

			<tbody>
			{detalles.map((detalle) => (
				<tr key={JSON.stringify(detalle)}>
					<td>{detalle.nombre}</td>
					<th scope="row">{detalle.cantidad}</th>
				</tr>
			))}
			</tbody>
		</table>
		</>
	);
};

export default Detalles;