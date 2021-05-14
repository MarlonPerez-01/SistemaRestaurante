import React, { useEffect, useState } from 'react';
import Orden from './Orden';

const Ordenes = () => {
	const [ordenes, setOrdenes] = useState([]);

	const obtenerOrdenes = async () => {
		const res = await fetch('http://127.0.0.1:8080/ventas', {
			method: 'GET'
		});
		const data = await res.json();

		setOrdenes(data.data);
	};

	useEffect(() => {
		obtenerOrdenes();
	}, []);

	const handleEliminar = async (id) => {
		try {
			await fetch(`http://127.0.0.1:8080/ventas/${id}`, {
				method: 'DELETE',
				headers: { 'Content-type': 'application/json; charset=UTF-8' }
			});

			let ordenesActualizadas = [...ordenes].filter((orden) => orden.id !== id);
			setOrdenes(ordenesActualizadas);

			obtenerOrdenes();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className='row'>
				<h1 className='col text-center mb-4 mt-4 text-secondary'>
					Listado de ordenes
				</h1>
			</div>
			{ordenes.length > 0 && (
				<div className='row'>
					{ordenes.map((orden) => (
						<Orden
							key={orden.id_venta}
							orden={orden}
							handleEliminar={handleEliminar}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default Ordenes;
