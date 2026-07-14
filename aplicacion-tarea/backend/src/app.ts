import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import clienteRoutes from './routes/cliente.routes';

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta de verificación de estado del servidor
app.get('/', (_req, res) => {
  res.json({ mensaje: 'API de Clientes funcionando correctamente' });
});

// Rutas de la entidad Cliente
app.use('/api/clientes', clienteRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});