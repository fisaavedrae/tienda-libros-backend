const postLibroMiddleware = (req, res, next) => {
  const { titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero } = req.body;  
  try {    
    if (
      !titulo || titulo.trim() === "" ||
      !resena || resena.trim() === "" ||
      !urlimagen || urlimagen.trim() === ""   
    ){
      return res.status(400).json({
        status: "Bad Request",
        message: "Todos los campos son obligatorios",
      });
    } else if (precio <= 0 || !Number(precio)){
        return res.status(400).json({
          status: "Bad Request",
          message: "El valor de precio deben ser numerico y mayor a 0",
        });
    } else if (stock <= 0 || !Number(stock)){
        return res.status(400).json({
          status: "Bad Request",
          message: "El valor de stock deben ser numerico y mayor a 0",
        });
    } else if (id_autor <= 0 || !Number(id_autor)){
        return res.status(400).json({
          status: "Bad Request",
          message: "Debe seleccionar un autor",
        });
    } else if (id_editorial <= 0 || !Number(id_editorial)){
        return res.status(400).json({
          status: "Bad Request",
          message: "Debe seleccionar una editorial",
        });
    } else if (id_genero <= 0 || !Number(id_genero)){
        return res.status(400).json({
          status: "Bad Request",
          message: "Debe seleccionar un genero",
        });
    } else if (typeof destacado !== 'boolean'){
        return res.status(400).json({
          status: "Bad Request",
          message: "Destacado debe ser true o false",
        });      
    };
    next();
    
  } catch (error) {
    console.log(error);
  };
};


const putLibroMiddleware = (req, res, next) => {
  const { id } = req.params;
  const { titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero } = req.body;   
  try { 
    if (!id || !Number(id) || id <= 0){
      return res.status(400).json({
        status: "Bad Request",
        message: "El parametro ID deben ser numerico y mayor a 0",
      });
    } else {
      if (
        !titulo || titulo.trim() === "" ||
        !resena || resena.trim() === "" ||
        !urlimagen || urlimagen.trim() === ""    
      ){
        return res.status(400).json({
          status: "Bad Request",
          message: "Todos los campos son obligatorios",
        });
      } else if (precio <= 0 || !Number(precio)){
          return res.status(400).json({
            status: "Bad Request",
            message: "El valor de precio deben ser numerico y mayor a 0",
          });
      } else if (stock <= 0 || !Number(stock)){
          return res.status(400).json({
            status: "Bad Request",
            message: "El valor de stock deben ser numerico y mayor a 0",
          });
      } else if (id_autor <= 0 || !Number(id_autor)){
          return res.status(400).json({
            status: "Bad Request",
            message: "Debe seleccionar un autor",
          });
      } else if (id_editorial <= 0 || !Number(id_editorial)){
          return res.status(400).json({
            status: "Bad Request",
            message: "Debe seleccionar una editorial",
          });
      } else if (id_genero <= 0 || !Number(id_genero)){
          return res.status(400).json({
            status: "Bad Request",
            message: "Debe seleccionar un genero",
          });
      } else if (typeof destacado !== 'boolean'){
        return res.status(400).json({
          status: "Bad Request",
          message: "Destacado debe ser True o False",
        });
      };
      next();
    };
    
  } catch (error) {
    console.log(error);
  };
};


const deleteLibroMiddleware = (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id || !Number(id) || id <= 0){
      return res.status(400).json({
        status: "Bad Request",
        message: "El parametro ID deben ser numerico y mayor a 0",
      });
    } else {
      next();
    };
    
  } catch (error) {
    console.log(error); 
  };
};

module.exports = {
  postLibroMiddleware,
  putLibroMiddleware,
  deleteLibroMiddleware  
};