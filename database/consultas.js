const pool = require("./index");
const format = require("pg-format");

const readLibros = async (
  id_autor,
  id_editorial,
  id_genero,
  precio,
  limits,
  page,
  order_by
) => {
  try {
    const [campo, direccion] = order_by.split("_");
    const offset = (page - 1) * limits;
    console.log("offset", offset);
    const consultaUno =
      "select id_libro, titulo, resena, urlimagen, precio, stock, destacado,libros.id_autor, autor.nombre as autor, libros.id_editorial, editorial.nombre as editorial, libros.id_genero, genero.genero as genero from libros join autor on libros.id_autor = autor.id_autor  join editorial on libros.id_editorial = editorial.id_editorial join genero on libros.id_genero = genero.id_genero where ('-1' = '%s' or libros.id_autor = '%s') and ('-1' = '%s' or libros.id_editorial = '%s') and ('-1' = '%s' or libros.id_genero = '%s') and precio <= %s order by %s %s ";
    const formattedQueryUno = format(
      consultaUno,
      id_autor,
      id_autor,
      id_editorial,
      id_editorial,
      id_genero,
      id_genero,
      precio,
      campo,
      direccion
    );
    const response = await pool.query(formattedQueryUno);
    console.log("cantidad de libros:", response.rows.length);
    const cantidadLibros = response.rows.length;

    const consulta =
      "select %s as cantidadLibros, id_libro, titulo, resena, urlimagen, precio, stock, destacado,libros.id_autor, autor.nombre as autor, libros.id_editorial, editorial.nombre as editorial, libros.id_genero, genero.genero as genero from libros join autor on libros.id_autor = autor.id_autor  join editorial on libros.id_editorial = editorial.id_editorial join genero on libros.id_genero = genero.id_genero where ('-1' = '%s' or libros.id_autor = '%s') and ('-1' = '%s' or libros.id_editorial = '%s') and ('-1' = '%s' or libros.id_genero = '%s') and precio <= %s order by %s %s limit %s offset %s";
    const formattedQuery = format(
      consulta,
      cantidadLibros,
      id_autor,
      id_autor,
      id_editorial,
      id_editorial,
      id_genero,
      id_genero,
      precio,
      campo,
      direccion,
      limits,
      offset
    );
    console.log("formattedQuery", formattedQuery);
    let { rows } = await pool.query(formattedQuery);
    console.log("cantidad de libros:", rows.length);

    console.log("Libros encontrados con exito");
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const readLibro = async (id) => {
  try {
    const consulta =
      "select id_libro, titulo, resena, urlimagen, precio, stock, destacado,libros.id_autor, autor.nombre as autor, libros.id_editorial, editorial.nombre as editorial, libros.id_genero, genero.genero as genero from libros join autor on libros.id_autor = autor.id_autor  join editorial on libros.id_editorial = editorial.id_editorial join genero on libros.id_genero = genero.id_genero where id_libro = $1";
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
    const consulta =
      "select a.id_autor, a.nombre, c.cant as cantidad_libros from autor as a join  (select count(id_autor) cant, id_autor from libros group by id_autor) as c on a.id_autor = c.id_autor";
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
    const consulta =
      "select a.id_editorial, a.nombre, c.cant as cantidad_libros from editorial as a join  (select count(id_editorial) cant, id_editorial from libros group by id_editorial) as c on a.id_editorial = c.id_editorial";
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
    const consulta =
      "select a.id_genero, a.genero, c.cant as cantidad_libros from genero as a join (select count(id_genero) cant, id_genero from libros group by id_genero) as c on a.id_genero = c.id_genero";
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

const validaExisteCampo = async (campo) => {
  console.log(campo);
  try {
    const formattedQuery = format(
      `SELECT column_name 
                       FROM information_schema.columns 
                       WHERE table_schema='public' 
                         and table_name='libros' 
                         and column_name='%s'`,
      campo
    );
    const { rows } = await pool.query(formattedQuery);
    return rows;
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
  }
};

//modificar un libro
const modificaLibro = async (titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero, id) => {
  try {
    const consulta = "UPDATE libros SET titulo = $1, resena = $2, urlimagen = $3, precio = $4, stock = $5, destacado = $6, id_autor = $7, id_editorial = $8, id_genero = $9 WHERE id_libro = $10";
    const values =[titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero, id];
    const { rows } = await pool.query(consulta, values);
    console.log("libro modificado");
  } catch (error) {
    console.log("libro no encontrado");
  }
};

//eliminar un libro
const borraLibro = async (id) => {
  try {
    const consulta = "DELETE FROM libros WHERE id_libro = $1";
    const values = [id];
    await pool.query(consulta, values);
    console.log("libro eliminado");
  } catch (error) {
    console.log("libro no encontrado");
  }
};

//trae autor x select
const traerAutorSelect = async () => {
  try {
    const consulta = "SELECT * FROM autor";
    const { rows } = await pool.query(consulta);
    console.log("autores encontrados");
    return rows;
  } catch (error) {
    console.log(error);
  }
};

//trae editorial x select
const traerEditorialSelect = async () => {
  try {
    const consulta = "SELECT * FROM editorial";
    const { rows } = await pool.query(consulta);
    console.log("editoriales encontrados");
    return rows;
  } catch (error) {
    console.log(error);
  }
};

//trae genero x select
const traerGeneroSelect = async () => {
  try {
    const consulta = "SELECT * FROM genero";
    const { rows } = await pool.query(consulta);
    console.log("generos encontrados");
    return rows;
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

  validaExisteCampo,

  agregaLibro,
  modificaLibro,
  borraLibro,
  traerAutorSelect,
  traerEditorialSelect,
  traerGeneroSelect
};
