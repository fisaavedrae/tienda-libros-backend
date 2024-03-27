# React + Vite

# Hito 2 - Desarrollo Frontend

Lee todo el documento antes de comenzar el desarrollo grupal, para asegurarte de tener el máximo de puntaje y enfocar bien los esfuerzos.

# Descripción

El segundo hito consiste en el desarrollo de la aplicación cliente con React, en donde debes:

<ul><li>Crear un nuevo proyecto con las dependencias acorde al diseño y temática definida en el hito anterior.</li>
<li>>Usar los componentes para la reutilización de código y separación de secciones integrando los hooks necesarios que correspondan.</li>
<li>Usar React Router para la navegación de vistas por rutas.</li>
<li>>Utilizar Context API para el manejo de estado global.</li>
<li>>Preparar la aplicación para el consumo de datos siguiendo el contrato definido en el hito anterior.</li>

Se recomienda utilizar un framework de CSS para agilizar la construcción de la interfaz gráfica del proyecto.

# Requerimientos

<ol>
<li>Crear un nuevo proyecto usando npx e instalar las dependencias.
(1 Punto)</li>
<li>Utilizar React Router para la navegación entre rutas.
(3 Puntos)</li>
<li>Reutilizar componentes haciendo uso del paso de props y renderización dinámica.
(1 Punto)</li>
<li>Hacer uso de los hooks para un desarrollo ágil y reactivo.
(2 Puntos)</li>
<li>Utilizar Context para el manejo del estado global.
(3 Puntos)</li>
</ol>

# Consideraciones

<ul>
<li>El repo entregado para revisión de frontend, es una copia del repo original, esto debido a que continuaremos trabajando en el repo original para realizar las conexiones con backend</li>
<li>En esta instancia toda la inteacción dinamica con datos se realizó usando archivos json, la interacción con base de datos se realizará en la proxima etapa (backend)</li>
<li>Login, Registro de usuario, CRUD de Libros, se desarrollaron hasta el ingreso de datos por formulario y su validación de completitud de los datos, las validaciones de integridad se realizarán en la proxima etapa (backend)</li>
<li>Login, Registro de usuario, CRUD de Libros, se desarrollaron hasta el ingreso de datos por formulario, para ser visualizados como maqueta semi-funcional, la funcionalidad completa se realizará una vez se haga la conexión con el backend</li>
<li>Las funcionalidades de filtros y ordenamiento de la grilla de productos, se realizará en la etapa 2 (backend)</li>
<li>Por ahora todas las paginas estan publicas, las vsitas privadas, quedaran ocultas cuando se conecten con el backend en la siguiente etapa del proyecto</li>
</ul>

- [Live app](https://tienda-libros-frontend.vercel.app/)
- [Repo revisión](https://github.com/Jedi-Developer/tienda-libros-frontend-entrega)

```code
repo original

https://github.com/fisaavedrae/tienda-libros-frontend

```

# Hito 3 - Desarrollo Backend

Lee todo el documento antes de comenzar el desarrollo grupal, para asegurarte de tener el máximo de puntaje y enfocar bien los esfuerzos.

# Descripción

El tercer hito consiste en el desarrollo backend del proyecto, en donde debes:

<ul><li>Crear un nuevo proyecto npm.</li>
<li>Instalar las dependencias descritas en el primer hito.</li>
<li>Crear las diferentes rutas según el schema definido en el primer hito.</li>
<li>Levantar la API REST capaz de gestionar los datos de la base de datos PostgreSQL.</li>
<li>Implementar la autenticación y autorización de usuarios con JWT</li>
<li>Usar el paquete supertest para hacerle pruebas a diferentes rutas de la API REST.
<ul>
<li> Utiliza la extensión Thunder Client para hacer las pruebas de las diferentes rutas de la API REST.
</li>
<li>Se recomienda dividir el servidor en varios módulos para desarrollar la API REST para tener un desarrollo ordenado.
</li>
</ul>
</li>

# Requerimientos

<ol>
<li>Crear un nuevo proyecto de npm e instalar todas las dependencias que necesitarás.
(1 Punto)</li>
<li>Utilizar el paquete pg para gestionar la comunicación con la base de datos PostgreSQL.
(3 Puntos)</li>
<li>Implementar la autenticación y autorización de usuarios con JWT.
(2 Puntos)</li>
<li>Usar el paquete CORS para permitir las consultas de orígenes cruzados.
(1 Punto)</li>
<li>Utilizar middlewares para validar las credenciales o token en cabeceras en las rutas que aplique.
(2 Puntos)</li>
<li>Realizar test de por lo menos 4 rutas de la API REST comprobando los códigos de estados de diferentes escenarios.
(1 Punto)</li>
</ol>

# Consideraciones

<ul>
<li>El repo entregado para revisión, contiene Frontend y Backend, y continuamos trabajando el los dos repositorios</li>
<li>En la raiz del repositorio se encuentra la carpeta <b>script_bd</b> donde está el archivo con las querys para creacion de base de datos y tablas</li>
<li>En la raiz del repositorio se encuentra la carpeta <b>script_bd</b> con los archivos para cargar la informacion base del sitio web, Libros, Autores, Editoriales, Generos y Usuarios (cliente y admin)</li>
<li>El registro de usuario solo permite crear un usuario del tipo Usuario (cliente), para crear un usuario Admin, se debe asignar el rol de administrador al usuario, desde la base de datos </li>
</ul>

Se deben cargar las siguientes variables en el archivo .env

```code
DB_USER=""
DB_DATABASE=""
DB_HOST=""
DB_PASSWORD=""
SECRET = "az_AZ"
PORT=3000
```

# API - Documentación Rutas

- GET: /autores

  - Permite obtener el listado de todos los autores. Esta ruta no recibe parametros

  ```code
  http://localhost:3000/autores
  ```

- GET: /editoriales

  - Permite obtener el listado de todas las editoriales. Esta ruta no recibe parametros

  ```code
  http://localhost:3000/editoriales
  ```

- GET: /generos

  - Permite obtener el listado de todas los generos. Esta ruta no recibe parametros

  ```code
  http://localhost:3000/generos
  ```

- GET: /libros/filtros

  - Permite obtener el listado de libros a mostrar en la grilla, de acuerdo a los filtros seleccionados. Esta ruta recibe parametros los siguientes parametros:
  <ul>
  <li>id_autor: [integer] Para mostrar todos los autores se debe enviar -1 o el id de un autor</li>
  <li>id_editorial: [integer] Para mostrar todos las editoriales se debe enviar -1 o el id de una editorial</li>
  <li>id_genero: [integer] Para mostrar todos los generos se debe enviar -1 o el id de un genero</li>
  <li>maxPrice: [integer] Lista libros con el precio <= maxprice, por defecto desde el front se envia 100000</li>
  <li>limits: [integer] Indica el limite de productos por pagina</li>
  <li>page: [integer] Indica la pagina a mostrar</li>
  <li>order_by: [string] Indica el campo y dirección de ordenamiento, recibe uno de los siguientes valores adicionales al campo (unidos por <b>_</b> ): ASC o DESC, por ejemplo: <b>titulo_ASC</b>, <b>precio_DESC</b></li>
  </ul>

  ```code
  http://localhost:3000/libros/filtros?id_autor=-1&id_editorial=-1&id_genero=-1&maxPrice=100000&limits=6&page=1&order_by=titulo_DESC
  ```

- GET: /libros/:id

  - Permite obtener el listado de libros a mostrar en la grilla, de acuerdo a los filtros seleccionados. Esta ruta recibe parametros los siguientes parametros:
  <ul>
  <li>id: [integer] Indica el ID del libro a mostrar</li>
  </ul>

  ```code
  http://localhost:3000/libros/1
  ```

- GET: /usuarios/id

  - Permite obtener los datos de un usuario logueado. Esta ruta recibe los siguientes parametros:
  <ul>
  <li>token: [string] Indica el token del usuario, abajo un ejemplo de token para el usuario fisaavedrae@icloud.com, se debe agregar en <b>Autorization</b></li>
  </ul>

  ```code
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpc2FhdmVkcmFlQGljbG91ZC5jb20iLCJpYXQiOjE3MTEzMjkxMzR9.ciNGY_x9ncM7Fzopj-14mCs1mae3vGBxaoL4XkUAp4A
  ```

  ```code
  http://localhost:3000/usuarios/id
  ```

- POST: /registro

  - Permite registrar un nuevo usuario. Esta ruta recibe parametros los siguientes parametros:
  <ul>
  <li>body: [json] Todos los campos para crear el usuario</li>
  </ul>

  ```json
  {
    "nombre": "nombre usuario",
    "email": "email@email.com",
    "password": "password usuario",
    "direccion": "direccion usuario",
    "ciudad": "ciudad usuario"
  }
  ```

  ```code
  http://localhost:3000/registro
  ```

- POST: /login

  - Permite autentificar un usuario. Esta ruta recibe parametros los siguientes parametros:
  <ul>
  <li>body: [json] Los campos para loguear el usuario</li>
  </ul>

  ```json
  {
    "email": "email@email.com",
    "password": "password usuario"
  }
  ```

  ```code
  http://localhost:3000/login
  ```

- POST: /ordenes

  - Permite crear una orden. Esta ruta recibe parametros los siguientes parametros:
  <ul>
  <li>total: [integer] Monto con el total de la orden</li>
  <li>envio: [integer] Valor del envío</li>
  <li>body: [json] Todos los campos para crear la orden (carro)</li>
  <li>token: [string] Indica el token del usuario, abajo un ejemplo de token para el usuario fisaavedrae@icloud.com, se debe agregar en <b>Autorization</b></li>
  </ul>

  ```json
  [
    {
      "cantidadlibros": 42,
      "id_libro": 26,
      "titulo": "1984",
      "resena": "Una distopía clásica que describe un mundo totalitario donde la libertad individual es suprimida por un gobierno opresivo.",
      "urlimagen": "https://fidatech.net/felipe/fotos-libros/1984.jpg",
      "precio": 16000,
      "stock": 80,
      "destacado": false,
      "id_autor": 14,
      "autor": "George Orwell",
      "id_editorial": 13,
      "editorial": "Secker & Warburg",
      "id_genero": 5,
      "genero": "Ciencia ficción",
      "qty": 1
    }
  ]
  ```

  ```token
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpc2FhdmVkcmFlQGljbG91ZC5jb20iLCJpYXQiOjE3MTEzMjkxMzR9.ciNGY_x9ncM7Fzopj-14mCs1mae3vGBxaoL4XkUAp4A
  ```

  ```code
  http://localhost:3000/ordenes?total=20500&envio=4500
  ```

- GET: /ordenes

  - Permite listar las ordenes de un usuario. Esta ruta recibe parametros los siguientes parametros:
  <ul>

  <li>token: [string] Indica el token del usuario, abajo un ejemplo de token para el usuario fisaavedrae@icloud.com, se debe agregar en <b>Autorization</b></li>
  </ul>

  ```token
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpc2FhdmVkcmFlQGljbG91ZC5jb20iLCJpYXQiOjE3MTEzMjkxMzR9.ciNGY_x9ncM7Fzopj-14mCs1mae3vGBxaoL4XkUAp4A
  ```

  ```code
  http://localhost:3000/ordenes
  ```

- GET: /ordenes/:id_orden <b>(Disclaimer: esta ruta va a sufrir cambios)</b>

  - Permite obtener el detalle de todas las ordenes de un usuario. Esta ruta recibe parametros los siguientes parametros:
    <ul>
    <li>id_orden: [integer] Indica el ID de la orden a mostrar</li>
    <li>token: [string] Indica el token del usuario, abajo un ejemplo de token para el usuario fisaavedrae@icloud.com, se debe agregar en <b>Autorization</b></li>
    </ul>

  ```token
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpc2FhdmVkcmFlQGljbG91ZC5jb20iLCJpYXQiOjE3MTEzMjkxMzR9.ciNGY_x9ncM7Fzopj-14mCs1mae3vGBxaoL4XkUAp4A
  ```

  ```code
  http://localhost:3000/ordenes/1
  ```

- GET: /libros

  - Permite obtener el listado de todos los libros. Esta ruta no recibe parametros

  ```code
  http://localhost:3000/libros
  ```


- **ATENCION:** Las siguientes 3 rutas requieren que el Token sea de un usuario con rol de administrador. Para obtener este Token use la ruta POST: /login con las siguientes credenciales.

  ```json
  {
    "email": "rimar.basaa@gmail.com",
    "password": "rimar"
  }
  ```

- POST: /libros

  - Permite agregar un libro. Esta ruta recibe los siguientes parametros:
  <ul>
  <li>body: [json] Todos los campos para agregar el libro</li>
  <li>token: [string] Indica el token del usuario, abajo un ejemplo de token para el usuario rimar.basaa@gmail.com, se debe agregar en <b>Autorization</b></li>
  </ul>

  ```json
  [
    {
      "titulo": "Titulo",
      "resena": "Reseña libro",
      "urlimagen": "urlimagen",
      "precio": 10000,
      "stock": 100,
      "destacado": false,
      "id_autor": 1,
      "id_editorial": 1,
      "id_genero": 1
    }
  ]
  ```

  ```token
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpbWFyLmJhc2FhQGdtYWlsLmNvbSIsImlhdCI6MTcxMTQ5NjM1OH0.MiZSq-2GJD8LWik9pHpy8Bf2JsU-HfBtvMG0tGcNQzg
  ```

  ```code
  http://localhost:3000/libros
  ```

- PUT: /libros/:id

  - Permite modificar un libro. Esta ruta recibe los siguientes parametros:
  <ul>
  <li>id: [integer] Indica el ID del libro a modificar</li>
  <li>body: [json] Todos los campos para modificar el libro</li>
  <li>token: [string] Indica el token del usuario, abajo un ejemplo de token para el usuario rimar.basaa@gmail.com, se debe agregar en <b>Autorization</b></li>
  </ul>

  ```json
  [
    {
      "titulo": "Titulo modificado",
      "resena": "Reseña libro modificado",
      "urlimagen": "urlimagen modificado",
      "precio": 10000,
      "stock": 100,
      "destacado": false,
      "id_autor": 1,
      "id_editorial": 1,
      "id_genero": 1
    }
  ]
  ```

  ```token
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpbWFyLmJhc2FhQGdtYWlsLmNvbSIsImlhdCI6MTcxMTQ5NjM1OH0.MiZSq-2GJD8LWik9pHpy8Bf2JsU-HfBtvMG0tGcNQzg
  ```

  ```code
  http://localhost:3000/libros/1
  ```

- DELETE: /libros/:id

  - Permite eliminar un libro. Esta ruta recibe los siguientes parametros:
  <ul>
  <li>id: [integer] Indica el ID del libro a eliminar</li>
  <li>token: [string] Indica el token del usuario, abajo un ejemplo de token para el usuario rimar.basaa@gmail.com, se debe agregar en <b>Autorization</b></li>
  </ul>

  ```token
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpbWFyLmJhc2FhQGdtYWlsLmNvbSIsImlhdCI6MTcxMTQ5NjM1OH0.MiZSq-2GJD8LWik9pHpy8Bf2JsU-HfBtvMG0tGcNQzg
  ```

  ```code
  http://localhost:3000/libros/1
  ```



- [Live app](https://tienda-libros-frontend.vercel.app/)
- [Repo revisión](https://github.com/fisaavedrae/tienda-libros-backend)
