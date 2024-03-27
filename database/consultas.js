const { DatabaseError } = require("pg");
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
      "SELECT id_usuario, nombre, email, password, direccion, ciudad, usuarios.id_rol, roles.rol FROM usuarios  JOIN roles ON roles.id_rol = usuarios.id_rol WHERE email = $1";
    //console.log(consulta)
    const values = [email];
    const { rows } = await pool.query(consulta, values);
    console.log("Usuario encontrado con exito");
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const createOrden = async (monto, id_usuario, carro) => {
  try {
    const consulta =
      "INSERT INTO ordenes (fecha_orden, monto, id_usuario) VALUES (current_timestamp,$1,$2) RETURNING id_orden";
    const values = [monto, id_usuario];
    const { rows } = await pool.query(consulta, values);
    console.log("primer insert", rows);
    const id_orden = rows[0].id_orden;
    carro.map(async (obj) => {
      const consulta2 =
        "INSERT INTO ordenes_libros (id_orden, id_libro, cantidad, monto ) VALUES ($1, $2, $3, $4)";
      const values2 = [
        id_orden,
        obj.id_libro,
        obj.qty,
        Number(obj.qty) * Number(obj.precio),
      ];
      await pool.query(consulta2, values2);
    });
    return id_orden;
  } catch (error) {
    console.log(error);
  }
};

const readOrdenes = async (email) => {
  try {
    const consulta =
      "select o.id_orden, TO_CHAR(fecha_orden, 'dd/mm/yyyy') fecha_orden, monto from ordenes o join usuarios u on o.id_usuario = u.id_usuario where u.email= $1";
    //"select o.id_orden, fecha_orden, o.monto monto_orden, l.titulo, l.urlimagen, ol.monto precio, ol.cantidad from ordenes o join usuarios u on o.id_usuario = u.id_usuario join ordenes_libros ol on ol.id_orden = o.id_orden join libros l on l.id_libro = ol.id_libro where u.email = $1 order by id_orden";
    console.log(consulta);
    const values = [email];
    const { rows } = await pool.query(consulta, values);
    console.log("Ordenes encontradas con exito");
    return rows;
  } catch (error) {
    console.log(error);
  }
};
const readOrden = async (email) => {
  try {
    const consulta =
      "select o.id_orden, l.titulo, l.urlimagen, ol.monto, ol.cantidad, l.precio from ordenes o join usuarios u on o.id_usuario = u.id_usuario join ordenes_libros ol on ol.id_orden = o.id_orden join libros l on l.id_libro = ol.id_libro       where u.email = $1 order by id_orden";
    console.log(consulta);
    console.log("email", email);
    const values = [email];
    const { rows } = await pool.query(consulta, values);
    console.log("Ordenes encontradas con exito");
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

// CRUD admin ------------------------------------------------------------------------
//agregar un libro
const agregaLibro = async (titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero) => {
  try {
    const consulta = "INSERT INTO libros (id_libro, titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9)";
    const values =[titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero];
    const { rowCount } = await pool.query(consulta, values);
    console.log("libro agregado");
    return rowCount;
    
  } catch (error) {
    console.log(error);
  }
};

//modificar un libro
const modificaLibro = async (titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero, id) => {
  try {
    const consulta = "UPDATE libros SET titulo = $1, resena = $2, urlimagen = $3, precio = $4, stock = $5, destacado = $6, id_autor = $7, id_editorial = $8, id_genero = $9 WHERE id_libro = $10";
    const values =[titulo, resena, urlimagen, precio, stock, destacado, id_autor, id_editorial, id_genero, id];
    const { rowCount } = await pool.query(consulta, values);
    if (!rowCount) throw { code: 404, message: "No se encontró ningún libro con este ID" };
    console.log("libro modificado");
    return rowCount;

  } catch (error) {
    console.log(error);
  };
};

//eliminar un libro
const borraLibro = async (id) => {
  try {
    const formatQuery = format("DELETE FROM libros WHERE id_libro = %s", id);
    const { rowCount } = await pool.query(formatQuery);
    if (!rowCount) throw { code: 404, message: "No se encontró ningún libro con este ID" };
    console.log("libro eliminado");
    return rowCount;

  } catch (error) {
    console.log(error);
  };
};

//trae autor x select
const traerAutorSelect = async () => {
  try {
    const consulta = "SELECT * FROM autor";
    const { rows } = await pool.query(consulta);
    console.log("autores encontrados - ok");
    return rows;

  } catch (error) {
    console.log(error);
  };
};

//trae editorial x select
const traerEditorialSelect = async () => {
  try {
    const consulta = "SELECT * FROM editorial";
    const { rows } = await pool.query(consulta);
    console.log("editoriales encontrados - ok");
    return rows;

  } catch (error) {
    console.log(error);
  };
};

//trae genero x select
const traerGeneroSelect = async () => {
  try {
    const consulta = "SELECT * FROM genero";
    const { rows } = await pool.query(consulta);
    console.log("generos encontrados - ok");
    return rows;
    
  } catch (error) {
    console.log(error);
  }
};

//traer todos los libros
const traerAllLibros = async () => {
  try {
    const consulta = "SELECT * FROM libros";
    const { rows } = await pool.query(consulta);
    console.log("libros encontrados - ok");
    return rows;
    
  } catch (error) {
    console.log(error);
  }
};

const traerRol = async (email) => {
  //console.log("consulta" + email)
  try {
    const consulta = "SELECT id_rol FROM usuarios WHERE email = $1";
    values = [email]
    const { rows } = await pool.query(consulta, values);
    console.log("rol encontrado - ok");
    return rows[0].id_rol;
    
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
  createOrden,
  readOrdenes,
  readOrden,
  validaExisteCampo,

  agregaLibro,
  modificaLibro,
  borraLibro,
  traerAutorSelect,
  traerEditorialSelect,
  traerGeneroSelect,
  traerAllLibros,
  traerRol
};
