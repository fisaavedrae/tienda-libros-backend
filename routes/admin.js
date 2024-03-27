const express = require("express");
const router_admin = express.Router();
const { validarAdmin } = require('../middlewares/validarAdmin.js')

const {
  getLibrosController,
  postLibroController,
  putLibroController,
  deleteLibroController,
  getSelectAutorController,
  getSelectEditorialController,
  getSelectGeneroController,
} = require("../controllers/admin.js");

const {
  postLibroMiddleware,
  putLibroMiddleware,
  deleteLibroMiddleware
} = require("../middlewares/admin.js");


// CRUD admin
router_admin.get("/libros", getLibrosController);
router_admin.post("/libros", validarAdmin, postLibroMiddleware, postLibroController);
router_admin.put("/libros/:id",validarAdmin, putLibroMiddleware, putLibroController);
router_admin.delete("/libros/:id",validarAdmin, deleteLibroMiddleware, deleteLibroController);
router_admin.get("/select/autor", getSelectAutorController);
router_admin.get("/select/editorial", getSelectEditorialController);
router_admin.get("/select/genero", getSelectGeneroController);

module.exports = router_admin;
