import * as Usuario from '../models/Login';
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');

export const seleccionarPorNombreU = async (req, res) => {
  let { nombre_usuario, contrasenia } = res.locals.bodyValidado;

  try {
    const data = await Usuario.seleccionarPorNombreU(nombre_usuario);
    /*los array vacios cuentan como valores verdaderos asi que lo evaluo asi para que sirva la comprobacion
    en vez de usar !data como haria normalmente*/
    if (data == false) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Credenciales invalidas' }] });
    }

    let pass = data[0].contrasenia;

    //verificar la contrasenia
    const contraseniaValida = await bcrypt.compareSync(contrasenia, pass);
    if (!contraseniaValida) {
      return res.status(400).json({
        msg: 'Usuario o contrasenia incorrectos'
      });
    }

    //generar el jwt
    const payload = {
      usuario: {
        id_usuario: data[0].id_usuario,
        id_empleado: data[0].id_empleado,
        id_tipo_usuario: data[0].id_empleado,
        nombre_tipo_usuario: data[0].nombre_tipo_usuario
      }
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          msg: 'Token generado',
          data: { token, nombre_tipo_usuario: data[0].nombre_tipo_usuario }
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Comuniquese con el administrador' });
  }
};
