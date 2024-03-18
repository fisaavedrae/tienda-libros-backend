const express = require("express");
const router = express.Router();

const {
  getLibrosController,
  getLibroController,
  getAutoresController,
  getEditorialesController,
  getGenerosController,
  getUsuarioController,
  postRegistroController,
  postAuthController,
  //postOrdenesController,
  //getOrdenesController,
} = require("../controllers/index.js");
const {
  getLibrosMiddleware,
  getLibroMiddleware,
  getAutoresMiddleware,
  getEditorialesMiddleware,
  getGenerosMiddleware,
  getUsuarioMiddleware,
  postRegistroMiddleware,
  postAuthMiddleware,
  // postOrdenesMiddleware,
  // getOrdenesMiddleware,
} = require("../middlewares/index.js");

router.get("/libros", getLibrosMiddleware, getLibrosController);
router.get("/libros/:id", getLibroMiddleware, getLibroController);
router.get("/autores", getAutoresMiddleware, getAutoresController);
router.get("/editoriales", getEditorialesMiddleware, getEditorialesController);
router.get("/generos", getGenerosMiddleware, getGenerosController);
router.get("/usuarios/id", getUsuarioMiddleware, getUsuarioController);
router.post("/registro", postRegistroMiddleware, postRegistroController);
router.post("/login", postAuthMiddleware, postAuthController);
//router.post("/ordenes", postOrdenesMiddleware, postOrdenesController);
//router.get("/ordenes/:id", getOrdenesMiddleware, getOrdenesController);
//router.get("/carrito/:id", getCarritoMiddleware, getCarritoController);
//router.post("/carrito/:id", postCarritoMiddleware, postCarritoController);

module.exports = router;
