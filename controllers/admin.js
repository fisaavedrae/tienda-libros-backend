require("dotenv").config();
const jwt = require("jsonwebtoken");

const {
  agregaLibro,
  modificaLibro,
  borraLibro,
  traerAutorSelect,
  traerEditorialSelect,
  traerGeneroSelect
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
    await modificaLibro(titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero, id);

    res.status(200).json({
      status: "Success",
      message: "Libro modificado"
    });

  } catch (error) {
    res.status(400).json({
      status: "Bad Request",
      message: "No se encontro libro"
    });
  };
};



//eliminar un libro
const deleteLibroController = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    await borraLibro(id);
    res.status(200).json({
      status: "Success",
      message: "Libro eliminado"
    });

  } catch (error) {
    res.status(400).json({
      status: "Bad Request",
      message: "No se encontro libro"
    });
    //next();
  };
};

//trae data x select
const getDataSelectController = async (req, res, next) => {
  try {
    const dataAutor = await traerAutorSelect();
    const dataEditorial = await traerEditorialSelect();
    const dataGenero = await traerGeneroSelect();
    
    res.status(200).json({dataAutor, dataEditorial, dataGenero });
      
  } catch (error) {
    res.status(400).json({
      status: "Bad Request",
      message: "No se pudo obtener Data",
    });
  };
};


module.exports = {
  postLibroController,
  putLibroController,
  deleteLibroController,
  getDataSelectController
};