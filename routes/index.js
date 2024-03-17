const express = require("express");
const router = express.Router();

const {
  getLibrosController,
  //getLibroController,
  //getAutoresController,
  //getEditorialesController,
  //getGenerosController,
  //postRegistroController,
  //postAuthController,
  //postOrdenesController,
  //getOrdenesController,
} = require("../controllers/index.js");
const {
  getLibrosMiddleware,
  // getLibroMiddleware,
  /// getAutoresMiddleware,
  // getEditorialesMiddleware,
  // getGenerosMiddleware,
  // postRegistroMiddleware,
  // postAuthMiddleware,
  // postOrdenesMiddleware,
  // getOrdenesMiddleware,
} = require("../middlewares/index.js");

router.get("/libros", getLibrosMiddleware, getLibrosController);
//router.get("/libros/:id", getLibroMiddleware, getLibroController);
//router.get("/autores", getAutoresMiddleware, getAutoresController);
//router.get("/editoriales", getEditorialesMiddleware, getEditorialesController);
//router.get("/generos", getGenerosMiddleware, getGenerosController);
//router.post("/registro", postRegistroMiddleware, postRegistroController);
//router.post("/login", postAuthMiddleware, postAuthController);
//router.post("/ordenes", postOrdenesMiddleware, postOrdenesController);
//router.get("/ordenes/:id", getOrdenesMiddleware, getOrdenesController);

module.exports = router;
