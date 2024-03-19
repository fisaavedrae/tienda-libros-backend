const pool = require("./index");

const readLibros = async () => {
  try {
    const consulta =
      "select id_libro, titulo, resena, urlimagen, precio, stock, destacado,libros.id_autor, autor.nombre, libros.id_editorial, editorial.nombre, libros.id_genero, genero.genero from libros join autor on libros.id_autor = autor.id_autor  join editorial on libros.id_editorial = editorial.id_editorial join genero on libros.id_genero = genero.id_genero";
    console.log(consulta);

    const { rows } = await pool.query(consulta);
    console.log("Libros encontrados con exito");
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
    console.log("Libro encontrado con exito");
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
    console.log("Autores encontrados con exito");
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const readEditoriales = async () => {
  try {
    const consulta = "select id_editorial, nombre FROM editorial";
    //console.log(consulta)

    const { rows } = await pool.query(consulta);
    console.log("Editoriales encontrados con exito");
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const readGeneros = async () => {
  try {
    const consulta = "select id_genero, genero FROM genero";
    //console.log(consulta)
    const { rows } = await pool.query(consulta);
    console.log("Generos encontrados con exito");
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const createUsuario = async (nombre, email, password, direccion, ciudad) => {
  try {
    const consulta =
      "INSERT INTO usuarios ( nombre, email, password, direccion, ciudad, id_rol, fecha_creacion) VALUES ($1, $2, $3, $4, $5, 1, current_timestamp) RETURNING id_usuario";
    const values = [nombre, email, password, direccion, ciudad];
    console.log(values);
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
      "select id_usuario, nombre, email, password, direccion, ciudad FROM usuarios WHERE email = $1";
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

// CRUD admin
//agregar un libro
const agregaLibro = async (titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero) => {
  try {
    const consulta = "INSERT INTO libros (id_libro, titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9)";
    const values =[titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero];
    const { rows } = await pool.query(consulta, values);
    console.log("libro agregado");

  } catch (error) {
    console.log("No se pudo agregar libro");    
  };
};


//modificar un libro
const modificaLibro = async (titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero, id) => {
  try {
    const consulta = "UPDATE libros SET titulo = $1, resena = $2, urlimagen = $3, precio = $4, stock = $5, destacado = $6, id_autor = $7, id_editorial = $8, id_genero = $9 WHERE id = $10";
    const values =[titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero, id];
    const { rows } = await pool.query(consulta, values);
    console.log("libro modificado");

  } catch (error) {
    console.log("libro no encontrado");    
  };
};


//eliminar un libro
const borraLibro = async (id) => {
  try {
    const consulta ="DELETE FROM libros WHERE id = $1";
    const values = [id];
    await pool.query(consulta, values);
    console.log("libro eliminado");

  } catch (error) {
    console.log("libro no encontrado");
  };
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
  agregaLibro,
  modificaLibro,
  borraLibro
};
