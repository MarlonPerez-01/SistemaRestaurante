export const insertar = async (venta, token) => {
  try {
    const res = await fetch('http://127.0.0.1:8080/ventas', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-auth-token': token
      },
      body: JSON.stringify(venta)
    });
    const datos = await res.json();
    return datos;
  } catch (err) {
    return err;
  }
};
