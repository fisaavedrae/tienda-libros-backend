const verificaEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
const prepararHATEOAS = (datos) => {
  let objetoBase = {
    id_orden: 0,
    fecha_orden: "",
    total: 0,
    libros: [{ urlimagen: "", titulo: "", precio: 0, cantidad: 0 }],
  };
  console.log("datos", datos);
  datos.map((orden, index) => (id = orden.id_orden));
  const orden = datos.map((m) => {});
  const libros = datos
    .map((m) => {
      return {
        urlimagen: datos.urlimagen,
        titulo: datos.titulo,
        precio: datos.precio,
        cantidad: datos.cantidad,
      };
    })
    .slice(0, 4);
  console.log("libros", libros);
  const id_orden = datos[0].id_orden;
  const fecha_orden = datos[0].fecha_orden;
  const total = datos[0].monto_orden;
  const HATEOAS = {
    id_orden,
    fecha_orden,
    total,
    libros,
  };
  return HATEOAS;
};

module.exports = { verificaEmail, prepararHATEOAS };
