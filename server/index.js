const express = require("express");
const app = express();
const routes = require("../routes/index");
const routes_admin = require("../routes/admin.js");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());
app.use("/", routes);
app.use("/", routes_admin);

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

module.exports = app;
