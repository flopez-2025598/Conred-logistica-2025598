import { Router } from 'express';
import {
  listarClientes,
  obtenerCliente,
  registrarCliente,
} from '../controllers/cliente.controller';

const router = Router();

router.get('/', listarClientes);
router.get('/:id', obtenerCliente);
router.post('/', registrarCliente);

export default router;