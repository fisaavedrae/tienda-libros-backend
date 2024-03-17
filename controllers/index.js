require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { readLibros } = require("../database/consultas");

const getLibrosController = async (req, res, next) => {
  const { data } = req;

  //console.log("email", email)
  try {
    const post_query = await readLibros();
    if (post_query != "") {
      res.status(200).json(post_query);
    } else {
      res.status(400).json({
        status: "Bad Request",
        message: "No se pudo obtener el usuario",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLibrosController,
};
