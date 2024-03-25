require("dotenv").config();
const jwt = require("jsonwebtoken");

const {
  agregaLibro,
  modificaLibro,
  borraLibro,
  traerAutorSelect,
  traerEditorialSelect,
  traerGeneroSelect,
  traerAllLibros
} = require("../database/consultas");

//agregar un libro
const postLibroController = async (req, res, next) => {
  const { titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero } = req.body;
  try {
    const data = await agregaLibro(titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero);
    if (data === 1) {
      res.status(200).json({
        status: "Success",
        message: "Libro agregado"
      });
    } else {
      res.status(400).json({
        status: "Bad Request",
        message: "No se pudo agregar libro"
      });
    };
    
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
    const data = await modificaLibro(titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero, id);
    if (data === 1) {
      res.status(200).json({
        status: "Success",
        message: "Libro modificado"
      });
    } else {
      res.status(400).json({
        status: "Bad Request",
        message: "No se encontro libro"
      });
    };     

  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      message: "Internal server error"
    });
  };
};



//eliminar un libro
const deleteLibroController = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await borraLibro(id);
    if (data === 1) {
      res.status(200).json({
        status: "Success",
        message: "Libro eliminado"
      });
    } else {
      res.status(400).json({
        status: "Bad Request",
        message: "No se encontro libro"
      });
    };    

  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      message: "Internal server error"
    });    
    
  };
};


//trae autor para selector
const getSelectAutorController = async (req, res, next) => {
  try {
    const dataAutor = await traerAutorSelect();    
    res.status(200).json(dataAutor);
      
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      message: "Internal server error"
    });
  };
};

//trae editorial para selector
const getSelectEditorialController = async (req, res, next) => {
  try {
    const dataEditorial = await traerEditorialSelect();    
    res.status(200).json(dataEditorial);
      
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      message: "Internal server error"
    });
  };
};

//trae genero para selector
const getSelectGeneroController = async (req, res, next) => {
  try {
    const dataGenero = await traerGeneroSelect();    
    res.status(200).json(dataGenero);
      
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      message: "Internal server error"
    });
  };
};

const getLibrosController = async (req, res, next) => {
  try {
    const dataLibros = await traerAllLibros();    
    res.status(200).json(dataLibros);
      
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      message: "Internal server error"
    });
  };
};


module.exports = {
  postLibroController,
  putLibroController,
  deleteLibroController,
  getSelectAutorController,
  getSelectEditorialController,
  getSelectGeneroController,
  getLibrosController
};