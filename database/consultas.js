const pool = require("./index");

const readLibros = async () => {
  try {
    const consulta =
      "select id_libro, titulo, resena, urlimagen, precio, stock, destacado,libros.id_autor, autor.nombre, libros.id_editorial, editorial.nombre, libros.id_genero, genero.genero from libros join autor on libros.id_autor = autor.id_autor  join editorial on libros.id_editorial = editorial.id_editorial join genero on libros.id_genero = genero.id_genero";
    console.log(consulta);

    const { rows } = await pool.query(consulta);
    console.log("Usuario encontrado con exito");
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const readLibro = async (id) => {
  try {
    const consulta =
      "select id_libro, titulo, resena, urlimagen, precio, stock, destacado,libros.id_autor, autor.nombre, libros.id_editorial, editorial.nombre, libros.id_genero, genero.genero from libros join autor on libros.id_autor = autor.id_autor  join editorial on libros.id_editorial = editorial.id_editorial join genero on libros.id_genero = genero.id_genero where id_libro = $1";
    //console.log(consulta)
    const values = [id];
    const { rows } = await pool.query(consulta, values);
    console.log("Usuario encontrado con exito");
    return rows;
  } catch (error) {
    console.log(error);
  }
};
const readAutores = async () => {
  try {
    const consulta = "select id_autor, nombre FROM autor";
    //console.log(consulta)

    const { rows } = await pool.query(consulta);
    console.log("Usuario encontrado con exito");
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const readEditoriales = async () => {
  try {
    const consulta = "select id_editorial, nombre FROM editorial";
    //console.log(consulta)
    const values = [email];
    const { rows } = await pool.query(consulta);
    console.log("Usuario encontrado con exito");
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const readGeneros = async () => {
  try {
    const consulta = "select id_genero, genero FROM genero";
    //console.log(consulta)
    const values = [email];
    const { rows } = await pool.query(consulta);
    console.log("Usuario encontrado con exito");
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const createUsuario = async (email, password, rol, lenguaje) => {
  try {
    const consulta =
      "INSERT INTO usuarios ( email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [email, password, rol, lenguaje];
    const { rows } = await pool.query(consulta, values);
    console.log("Usuario creado con exito");
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const readUsuario = async (email) => {
  try {
    const consulta =
      "select email, password, rol, lenguage FROM usuarios WHERE email = $1";
    //console.log(consulta)
    const values = [email];
    const { rows } = await pool.query(consulta, values);
    console.log("Usuario encontrado con exito");
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const verificaSiExisteCorreo = async (email) => {
  try {
    const consulta = "SELECT * FROM usuarios WHERE email = $1 ";
    const values = [email];
    const { rows } = await pool.query(consulta, values);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const verificarCredenciales = async (email, password) => {
  try {
    const consulta =
      "SELECT password AS passwordEncriptada FROM usuarios WHERE email = $1 ";
    const values = [email];
    const {
      rows: [usuario],
    } = await pool.query(consulta, values);
    return usuario;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  readLibros,
  readLibro,
  readAutores,
  readEditoriales,
  readGeneros,
  createUsuario,
  readUsuario,
  verificaSiExisteCorreo,
  verificarCredenciales,
};
