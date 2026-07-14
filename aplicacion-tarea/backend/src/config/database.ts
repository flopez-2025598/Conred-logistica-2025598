import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Verificación de conexión al iniciar el servidor
pool.connect()
  .then((client) => {
    console.log('Conexión a PostgreSQL establecida correctamente');
    client.release();
  })
  .catch((error) => {
    console.error('Error al conectar con PostgreSQL:', error.message);
  });