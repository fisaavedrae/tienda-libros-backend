const express = require("express");
const router_admin = express.Router();

const {
  //postLibroController,
  putLibroController,
  deleteLibroController,
  getDataSelectController,
} = require("../controllers/admin.js");

const {
  //postLibroMiddleware,
  putLibroMiddleware,
  deleteLibroMiddleware,
} = require("../middlewares/admin.js");

// CRUD admin
//router_admin.post("/libros", postLibroMiddleware, postLibroController);
router_admin.put("/libros/:id", putLibroMiddleware, putLibroController);
router_admin.delete("/libros/:id", deleteLibroMiddleware, deleteLibroController);
router_admin.get("/select", getDataSelectController)

module.exports = router_admin;
