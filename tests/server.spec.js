const request = require("supertest");
const server = require("../server/index.js");

describe("Operaciones de Tienda de Libros", () => {
  it("Obteniendo un 200", async () => {
    // Testea que la ruta GET /autores devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto
    const response = await request(server).get("/autores").send();
    const status = response.statusCode;
    const largo = response.body.length;

    expect(status).toBe(200);
    expect(largo).toBeGreaterThanOrEqual(1);
  });

  it("Obteniendo un 400", async () => {
    // Comprueba que se obtiene un código 400 al intentar crear un usuario con un email incorrecto
    const usuario = {
      nombre: "Manu Chao",
      email: "manu@chao",
      password: "1234",
      direccion: "Calle falsa 123",
      ciudad: "Puerto Montt",
    };
    const response = await request(server).post("/registro").send(usuario);
    const status = response.statusCode;
    expect(status).toBe(400);
  });

  it("Obteniendo un 201 al crear un usuario", async () => {
    // Prueba que la ruta POST /registro agrega un nuevo usuario y devuelve un código 201.
    const usuario = {
      nombre: "Manu Chao",
      email: "manu@chao.net",
      password: "1234",
      direccion: "Calle falsa 123",
      ciudad: "Puerto Montt",
    };
    const response = await request(server).post("/registro").send(usuario);
    const status = response.statusCode;
    expect(status).toBe(201);
  });
});

describe("Operaciones CRUD de libros", () => {
  
  it('Comprobando ruta GET de libros Ok devuelve statusCode [200]', async () => {
    const response = await request(server).get('/libros').send();
    const status = response.statusCode;
      expect(status).toBe(200);            
  });

  it('Eliminar libro sin token de autorización devuelve statusCode [401]', async () => {
    const id = 100;
    const response =  await request(server).delete(`/libros/${id}`).send();
    const status = response.statusCode;
    expect(status).toBe(401);
  });  

  /*ATENCION: Para esta prueba se debe usar un token valido de 1 usuario con rol de administrador. Obtengalo en la ruta POST /login con las siguientes credenciales:
  email: [rimar.basaa@gmail.com] - password: [rimar] y reemplazelo en la variable token.*/
  it('Agregar libro ok con token de autorizacion devuelve statusCode [200]', async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpbWFyLmJhc2FhQGdtYWlsLmNvbSIsImlhdCI6MTcxMTQ5NjM1OH0.MiZSq-2GJD8LWik9pHpy8Bf2JsU-HfBtvMG0tGcNQzg";
    const libro = {
      name: 'Producto de Prueba',
      titulo: "Titulo prueba",
      resena: "Reseña de prueba",
      urlimagen: "imagen de prueba",
      precio: 10000,
      stock: 10,
      destacado: false,
      id_autor: 2,
      id_editorial: 2,
      id_genero: 3
    };
    const response = await request(server).post('/libros').set('Authorization', `Bearer ${token}`).send(libro);
    const status = response.statusCode;
      expect(status).toBe(200);            
  });

});
