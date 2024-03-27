require("dotenv").config();
const jwt = require('jsonwebtoken');
const { traerRol } = require("../database/consultas");

const validarAdmin = async (req, res, next) => {
  const Authorization = req.header('Authorization');
  
  if (!Authorization) {
    return res.status(401).json({ 
      mensaje: 'Acceso denegado. Token no proporcionado'
    });
  } else {
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, process.env.SECRET);
    const { email } = jwt.decode(token);
    //console.log(email);
    try {
      const rol = await traerRol(email);
      //console.log(rol);
      if (rol != 2){
        return res.status(400).json({
          status: "Bad Request",
          message: "Necesita una Cuenta de Administrador",
        });
      } else {
        next();
      };
      
    } catch (error) {        
      res.status(401).json({ mensaje: 'Token no válido.' });
    };
  };

};

module.exports = { validarAdmin };
