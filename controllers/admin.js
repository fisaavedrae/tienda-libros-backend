require("dotenv").config();
const jwt = require("jsonwebtoken");

const {
  agregaLibro,
  modificaLibro,
  borraLibro
} = require("../database/consultas");

//agregar un libro



//modificar un libro



//eliminar un libro
const deleteLibroController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const query = await borraLibro(id);
    res.status(200).json({
      status: "Success",
      message: "Libro eliminado con éxito"
    });

  } catch (error) {
    res.status(400).json({
      status: "Bad Request",
      message: "No se pudo obtener el usuario"
    });
    next();
  };
};




module.exports = {
  postLibroController,
  putLibroController,
  deleteLibroController
};