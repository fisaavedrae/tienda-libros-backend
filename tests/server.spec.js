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
    // Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.
    const usuario = {
      nombre: "Manu Chao",
      email: "manu@chao.com",
      password: "1234",
      direccion: "Calle falsa 123",
      ciudad: "Puerto Montt",
    };
    const response = await request(server).post("/registro").send(usuario);
    const status = response.statusCode;
    expect(status).toBe(201);
  });
});
