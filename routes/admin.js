const express = require("express");
const router = express.Router();

const {
  postLibrosController,
  putLibrosController,
  deleteLibrosController,
} = require("../controllers");
const {
  postLibrosMiddleware,
  putLibrosMiddleware,
  deleteLibrosMiddleware,
} = require("../middlewares");
// CRUD
router.post("/libros", postLibrosMiddleware, postLibrosController);
router.put("/libros/:id", putLibrosMiddleware, putLibrosController);
router.delete("/libros/:id", deleteLibrosMiddleware, deleteLibrosController);

module.exports = router_admin;
