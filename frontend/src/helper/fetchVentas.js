export const insertar = async (venta) => {
  try {
    const res = await fetch('http://127.0.0.1:8080/ventas', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'x-auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkX3VzdWFyaW8iOjEyLCJpZF9lbXBsZWFkbyI6OSwiaWRfdGlwb191c3VhcmlvIjo5LCJub21icmVfdGlwb191c3VhcmlvIjoiQ0FKRVJPIn0sImlhdCI6MTYyMTgxMjY3MCwiZXhwIjoxNjIyMTcyNjcwfQ.BZnOUeuTrzkiIB3B9aHOL4mBKQ863lewDWfJP_UbPB0'
      },
      body: JSON.stringify(venta)
    });
    const datos = await res.json();
    return datos;
  } catch (err) {
    return err;
  }
};
