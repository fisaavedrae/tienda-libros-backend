require("dotenv").config();
const jwt = require("jsonwebtoken");
const { readLibros } = require("../database/consultas");
const { verificaEmail } = require("../utils");

const getLibrosMiddleware = async (req, res, next) => {
  // Aca debe ir el informe
  const url = req.url;
  console.log("---\n");
  console.log(
    ` Hoy ${new Date()} Se ha recibido una consulta en la ruta GET${url} con los parámetros: `,
    req.params,
    " body:",
    req.body
  );
  console.log("\n---\n");
  next();
};
const getUsuarioMiddleware = async (req, res, next) => {
  // Aca debe ir el informe
  const parametros = req.params;
  const querys = req.query;
  const url = req.url;
  console.log("---\n");
  console.log(
    ` Hoy ${new Date()} Se ha recibido una consulta en la ruta GET${url} con los parámetros: `,
    parametros,
    ` y con los querys: `,
    querys,
    " body:",
    req.body
  );
  console.log("\n---\n");

  try {
    const Authorization = req.header("Authorization");
    //console.log("Authorization:", Authorization)
    if (Authorization == undefined) {
      res.status(400).json({
        status: "Bad Request",
        message: "No hay token",
      });
    } else {
      const token = Authorization.split("Bearer ")[1];
      //console.log("Token:", token)
      try {
        jwt.verify(token, process.env.SECRET);
        const { email } = jwt.decode(token);
        //console.log(email)
        if (email != "") {
          const post_query = await verificaSiExisteCorreo(email);
          if (post_query != "") {
            req.data = {
              email: email,
              dataValid: true,
            };
            next();
          } else {
            res.status(400).json({
              status: "Bad Request",
              message: "No existe el correo en la base de datos",
            });
          }
        }
      } catch (error) {
        res.status(400).json({
          status: "Bad Request",
          message: "Token invalido",
        });
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { getLibrosMiddleware };
