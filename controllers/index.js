require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  readLibros,
  readLibro,
  readAutores,
  readEditoriales,
  readGeneros,
  createUsuario,
  readUsuario,
  verificarCredenciales,
  createOrden,
  readOrdenes,
  readOrden,
  //createOrden
} = require("../database/consultas");
const { verificaEmail } = require("../utils");

const getLibrosController = async (req, res, next) => {
  const { data } = req;
  const {
    id_autor,
    id_editorial,
    id_genero,
    maxPrice,
    limits,
    page,
    order_by,
  } = data;

  //console.log("email", email)
  try {
    const post_query = await readLibros(
      id_autor,
      id_editorial,
      id_genero,
      maxPrice,
      limits,
      page,
      order_by
    );
    if (post_query != "") {
      res.status(200).json(post_query);
    } else {
      res.status(400).json({
        status: "Bad Request",
        message: "No se pudo obtener los libros",
      });
    }
  } catch (error) {
    next(error);
  }
};
const getLibroController = async (req, res, next) => {
  const { data } = req;
  const { id_libro, dataValid } = data;

  //console.log("email", email)
  try {
    if (dataValid) {
      const post_query = await readLibro(id_libro);
      if (post_query != "") {
        res.status(200).json(post_query);
      } else {
        res.status(400).json({
          status: "Bad Request",
          message: "No se pudo obtener el libro con el id: " + id_libro,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

const getAutoresController = async (req, res, next) => {
  const { data } = req;

  try {
    const post_query = await readAutores();
    if (post_query != "") {
      res.status(200).json(post_query);
    } else {
      res.status(400).json({
        status: "Bad Request",
        message: "No se pudo obtener los autoeres",
      });
    }
  } catch (error) {
    next(error);
  }
};
const getEditorialesController = async (req, res, next) => {
  const { data } = req;

  try {
    const post_query = await readEditoriales();
    if (post_query != "") {
      res.status(200).json(post_query);
    } else {
      res.status(400).json({
        status: "Bad Request",
        message: "No se pudo obtener las editoriales",
      });
    }
  } catch (error) {
    next(error);
  }
};
const getGenerosController = async (req, res, next) => {
  const { data } = req;

  try {
    const post_query = await readGeneros();
    if (post_query != "") {
      res.status(200).json(post_query);
    } else {
      res.status(400).json({
        status: "Bad Request",
        message: "No se pudo obtener los generos",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getUsuarioController = async (req, res, next) => {
  const { data } = req;
  const { email, dataValid } = data;
  //console.log("email", email)
  try {
    if (dataValid) {
      const post_query = await readUsuario(email);
      if (post_query != "") {
        res.status(200).json(post_query);
      } else {
        res.status(400).json({
          status: "Bad Request",
          message: "No se pudo obtener el usuario",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
const postRegistroController = async (req, res, next) => {
  const { data } = req;
  const { nombre, email, password, direccion, ciudad, dataValid } = data;
  try {
    if (dataValid) {
      const passwordEncriptada = bcrypt.hashSync(password);
      const post_query = await createUsuario(
        nombre,
        email,
        passwordEncriptada,
        direccion,
        ciudad
      );
      //console.log(post_query)
      if (post_query != "" && post_query != undefined) {
        res.status(201).json({
          status: "Success",
          message: "Usuario Creado con exito",
          usuario: post_query,
        });
      } else {
        res.status(400).json({
          status: "Bad Request",
          message: "No se pudo crear el usuario",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

const postAuthController = async (req, res, next) => {
  const { data } = req;
  const { email, password, dataValid } = data;
  //console.log(email, password, dataValid)
  try {
    if (dataValid) {
      const query = await verificarCredenciales(email, password);
      const { passwordencriptada } = query;
      console.log(
        "passwordEncriptada",
        passwordencriptada,
        " passwordX",
        password,
        "query",
        query
      );
      if (passwordencriptada != "" && passwordencriptada != undefined) {
        const passwordEsCorrecta = bcrypt.compareSync(
          password,
          passwordencriptada
        );
        if (passwordEsCorrecta) {
          const token = jwt.sign({ email }, process.env.SECRET);
          res.status(200).json({
            status: "Success",
            message: "Usuario logueado con exito",
            token: token,
          });
        } else {
          res.status(400).json({
            status: "Bad Request",
            message: "Credenciales incorrectas",
          });
        }
      } else {
        res.status(400).json({
          status: "Bad Request",
          message: "No se encontró ningún usuario con estas credenciales",
        });
      }
    }
  } catch (error) {
    next(error);
    res.status(error.code || 500).send(error);
  }
};

const postOrdenesController = async (req, res, next) => {
  const { data, body } = req;
  const { id_usuario, email, total, envio, carro, dataValid } = data;
  try {
    if (dataValid) {
      const post_query = await createOrden(Number(total), id_usuario, carro);
      console.log("post_query", post_query);
      const id_orden = post_query;

      //const post_query = await createUsuario();
      console.log(carro);
      if (post_query != "" && post_query != undefined) {
        res.status(200).json({
          status: "Success",
          message: "Orden Creada con exito",
          id_orden: id_orden,
        });
      } else {
        res.status(400).json({
          status: "Bad Request",
          message: "No se pudo crear la orden",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
const getOrdenesController = async (req, res, next) => {
  const { data } = req;
  const { email, dataValid } = data;
  try {
    if (dataValid) {
      const post_query = await readOrdenes(email);
      //const post_query = await createUsuario();

      if (post_query != "" && post_query != undefined) {
        res.status(200).json(post_query);
      } else {
        res.status(400).json({
          status: "Bad Request",
          message: "No se pudo obtener las ordenes del usuario",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
const getDetalleOrdenController = async (req, res, next) => {
  const { data } = req;
  const { email, id_orden, dataValid } = data;
  try {
    if (dataValid) {
      const post_query = await readOrden(email);
      //const post_query = await createUsuario();

      if (post_query != "" && post_query != undefined) {
        res.status(200).json(post_query);
      } else {
        res.status(400).json({
          status: "Bad Request",
          message: "No se pudo obtener las ordenes del usuario",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLibrosController,
  getLibroController,
  getAutoresController,
  getEditorialesController,
  getGenerosController,
  getUsuarioController,
  postRegistroController,
  postAuthController,
  postOrdenesController,
  getOrdenesController,
  getDetalleOrdenController,
};
