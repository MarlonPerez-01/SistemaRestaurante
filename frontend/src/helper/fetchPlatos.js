export const obtener = async (token) => {
  try {
    const res = await fetch(`http://127.0.0.1:8080/platos`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': token
      }
    });
    const datos = await res.json();
    return datos;
  } catch (err) {
    return err;
  }
};

export const insertar = async (plato, token) => {
  try {
    const res = await fetch('http://127.0.0.1:8080/platos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-auth-token': token
      },
      body: JSON.stringify(plato)
    });
    const datos = await res.json();
    return datos;
  } catch (err) {
    return err;
  }
};

export const editar = async (plato_edit, token) => {
  try {
    const res = await fetch(
      `http://127.0.0.1:8080/platos/${plato_edit.id_plato}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-auth-token': token
        },
        body: JSON.stringify({
          nombre: plato_edit.nombre,
          precio: plato_edit.precio,
          descripcion: plato_edit.descripcion
        })
      }
    );
    const datos = await res.json();
    return datos;
  } catch (err) {
    return err;
  }
};

export const eliminar = async (id, token) => {
  try {
    const res = await fetch(`http://127.0.0.1:8080/platos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-auth-token': token
      }
    });
    const datos = await res.json();
    return datos;
  } catch (err) {
    return err;
  }
};
