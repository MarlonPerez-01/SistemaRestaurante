import React from 'react'
import { useState } from 'react';

const Platos = () => {

    //const idProvicional2 = Math.floor(Math.random() * 10000) + 1
    
    //cambiar esto por una llamada a la base cuando exista metodo para traer menu
    const [platos, setPlatos] = useState([
        {
            id_plato: 1,
            nombre: "pizza",
            precio: 15,
            descripcion: "pizza de jamon",
            imagen: "algo",
            estado: 1
        },
       {
            id_plato: 2,
            nombre: "hamburguesa",
            precio: 7,
            descripcion: "hamburguesa de carne",
            imagen: "algo",
            estado: 1
        }
    ])

    return (
        <div>
            
        </div>
    )
}

export default Platos
