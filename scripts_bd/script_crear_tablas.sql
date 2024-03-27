create database tienda-libros;

create table autor
(
id_autor serial primary key,
nombre varchar(255)
);
create table editorial
(
id_editorial serial primary key,
nombre varchar(255)
);
create table genero
(
id_genero serial primary key,
genero varchar(255)
);

create table libros
(id_libro serial primary key,
 titulo varchar(100),
 resena text,
 urlImagen varchar(255),
 precio integer,
 stock integer,
 destacado boolean,
 id_autor integer,
 id_editorial integer,
 id_genero integer,
 
 CONSTRAINT fk_autor
      FOREIGN KEY(id_autor) 
        REFERENCES autor(id_autor),
 CONSTRAINT fk_editorial
      FOREIGN KEY(id_editorial) 
        REFERENCES editorial(id_editorial),
  CONSTRAINT fk_genero
      FOREIGN KEY(id_genero) 
        REFERENCES genero(id_genero)
 );
 
 create table roles
 (
	 id_rol serial primary key,
	 rol varchar(255)
 );
 

 
 create table usuarios
 (
	 id_usuario serial primary key,
	 nombre varchar(255),
	 email varchar(255) unique,
	 password varchar(100),
	 direccion varchar(255),
	 ciudad varchar(100),
	 id_rol integer,
	 fecha_creacion timestamp,
	 CONSTRAINT fk_rol
      FOREIGN KEY(id_rol) 
        REFERENCES roles(id_rol)
 );
 create table ordenes
 (
	 id_orden serial primary key,
	 fecha_orden timestamp,
	 monto integer,
	 id_usuario integer,
	 CONSTRAINT fk_usuario
      FOREIGN KEY(id_usuario) 
        REFERENCES usuarios(id_usuario)
 );
 
 create table ordenes_libros
 (
	 id_orden integer,
	 id_libro integer,
	 cantidad integer,
	 monto integer,
	 CONSTRAINT fk_orden
      FOREIGN KEY(id_orden) 
        REFERENCES ordenes(id_orden),
	 CONSTRAINT fk_libro
      FOREIGN KEY(id_libro) 
        REFERENCES libros(id_libro)
 );
 
 CREATE TABLE Carrito (
    id_carrito SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_libro INTEGER REFERENCES libros(id_libro) ON DELETE CASCADE,
    cantidad INTEGER,
	monto integer,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);