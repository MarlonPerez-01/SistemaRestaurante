import React, { useEffect, useState } from 'react';
import Orden from './Orden';

const Ordenes = () => {
	const [ordenes, setOrdenes] = useState([]);

	useEffect(() => {
		fetch('http://127.0.0.1:8080/ventas')
			.then((res) => {
				if (res.status === 200) {
					return res.json();
				}
				if (res.status === 404) {
				}
			})
			.then((data) => {
				setOrdenes(data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [ordenes]);

	const handleEliminar = async (id) => {
		try {
			const res = await fetch(`http://127.0.0.1:8080/ventas/${id}`, {
				method: 'DELETE',
				headers: { 'Content-type': 'application/json; charset=UTF-8' }
			});

			let ordenesActualizadas = [...ordenes].filter((i) => i.id !== id);
			setOrdenes(ordenesActualizadas);

			if (res.status === 200) {
				return await res.json();
			}
			if (res.status === 404) {
			}

			console.log(ordenes);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className='row'>
				<h1 className='col text-center mb-3 mt-3 text-secondary'>
					Listado de ordenes
				</h1>
			</div>
			<div className='row'>
				{ordenes.map((orden) => (
					<Orden
						key={orden.id_venta}
						orden={orden}
						handleEliminar={handleEliminar}
					/>
				))}
			</div>
		</>
	);
};

export default Ordenes;
