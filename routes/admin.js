const express = require("express");
const router = express.Router();

const {
  postLibroController,
  putLibroController,
  deleteLibroController,
  getDataSelectController,
} = require("../controllers/admin.js");
const {
  postLibroMiddleware,
  putLibroMiddleware,
  deleteLibroMiddleware,
} = require("../middlewares/admin.js");

// CRUD admin
router.post("/libros", postLibroMiddleware, postLibroController);
router.put("/libros/:id", putLibroMiddleware, putLibroController);
router.delete("/libros/:id", deleteLibroMiddleware, deleteLibroController);
router.get("/select", getDataSelectController)

module.exports = router_admin;
