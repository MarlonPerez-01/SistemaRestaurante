import React from 'react';

const Plato = ({ plato, handleEliminar }) => {
	return (
		<ul className='list-group mb-5 col-md-4 text-capitalize'>
			<li className='list-group-item list-group-item-primary text-center'>
				{plato.nombre}
			</li>
			<li className='list-group-item text-center'>{plato.precio}</li>
			<li className='list-group-item text-center'>{plato.descripcion}</li>

			<input
				type='submit'
				className='btn btn-outline-secondary'
				value='Eliminar Plato'
				onClick={() => handleEliminar(plato.id_plato)}
			></input>
		</ul>
	);
};

export default Plato;
