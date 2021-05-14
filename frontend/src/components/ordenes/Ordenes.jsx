import React, { useEffect, useState } from 'react';
import Detalles from './Detalles';
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
	}, []);

	return (
		<div>
			<h1 className='text-center mt-3'>Ordenes</h1>
			<div>
				{ordenes.map((orden) => (
					<Orden key={orden.id_venta} orden={orden} />
				))}
			</div>
		</div>
	);
};

export default Ordenes;
