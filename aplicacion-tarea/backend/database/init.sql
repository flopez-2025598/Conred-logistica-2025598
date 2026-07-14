-- Creación de la base de datos (ejecutar por separado, ver guía de instalación)
-- CREATE DATABASE aplicacion_tarea_db;

-- Conectarse a la base de datos aplicacion_tarea_db antes de ejecutar lo siguiente

CREATE TABLE IF NOT EXISTS clientes (
    codigo_cliente     SERIAL PRIMARY KEY,
    nombre_cliente     VARCHAR(100) NOT NULL,
    direccion_cliente  VARCHAR(200) NOT NULL,
    telefono_cliente   VARCHAR(20)  NOT NULL
);