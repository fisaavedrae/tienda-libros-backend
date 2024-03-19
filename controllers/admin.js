require("dotenv").config();
const jwt = require("jsonwebtoken");

const {
  agregaLibro,
  modificaLibro,
  borraLibro
} = require("../database/consultas");

//agregar un libro
const postLibroController = async (req, res, next) => {
  const { titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero } = req.body;
  try {
    const { rows } = await agregaLibro(titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero);
    console.log(rows);

    res.status(200).json({
      status: "Success",
      message: "Libro agregado"
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      message: "Internal server error"
    });
  };
};



//modificar un libro
const putLibroController = async (req, res, next) => {
  const { id } = req.params;
  const { titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero } = req.body;
  try {
    const { rows } = await modificaLibro(titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero, id);
    console.log(rows);

    res.status(200).json({
      status: "Success",
      message: "Libro modificado"
    });

  } catch (error) {
    res.status(400).json({
      status: "Bad Request",
      message: "No se encontro libro"
    });
    next();
  };
};



//eliminar un libro
const deleteLibroController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const query = await borraLibro(id);
    res.status(200).json({
      status: "Success",
      message: "Libro eliminado"
    });

  } catch (error) {
    res.status(400).json({
      status: "Bad Request",
      message: "No se encontro libro"
    });
    next();
  };
};




module.exports = {
  postLibroController,
  putLibroController,
  deleteLibroController
};