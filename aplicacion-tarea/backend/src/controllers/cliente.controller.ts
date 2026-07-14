import { Request, Response } from 'express';
import {
  obtenerClientes,
  obtenerClientePorId,
  crearCliente,
} from '../persistence/cliente.persistence';
import { Cliente } from '../models/Cliente';

export async function listarClientes(_req: Request, res: Response): Promise<void> {
  try {
    const clientes = await obtenerClientes();
    res.status(200).json(clientes);
  } catch (error) {
    console.error('Error al listar clientes:', error);
    res.status(500).json({ mensaje: 'Error interno al obtener los clientes' });
  }
}

export async function obtenerCliente(req: Request, res: Response): Promise<void> {
  try {
    const codigoCliente = Number(req.params.id);

    if (isNaN(codigoCliente)) {
      res.status(400).json({ mensaje: 'El código de cliente debe ser numérico' });
      return;
    }

    const cliente = await obtenerClientePorId(codigoCliente);

    if (!cliente) {
      res.status(404).json({ mensaje: 'Cliente no encontrado' });
      return;
    }

    res.status(200).json(cliente);
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    res.status(500).json({ mensaje: 'Error interno al obtener el cliente' });
  }
}

export async function registrarCliente(req: Request, res: Response): Promise<void> {
  try {
    const { nombre, direccion, telefono } = req.body;

    if (!nombre || !direccion || !telefono) {
      res.status(400).json({
        mensaje: 'Los campos nombre, direccion y telefono son obligatorios',
      });
      return;
    }

    // 1. Traemos los clientes actuales de forma segura
    const clientesActuales = await obtenerClientes();
    
    // 2. Calculamos el siguiente ID numérico
    let siguienteCodigo = 1;
    if (clientesActuales.length > 0) {
      // Mapeamos usando únicamente 'codigoCliente' que es la propiedad válida
      const codigos = clientesActuales
        .map(c => Number(c.codigoCliente))
        .filter(num => !isNaN(num));
        
      if (codigos.length > 0) {
        siguienteCodigo = Math.max(...codigos) + 1;
      }
    }

    // 3. Pasamos el objeto con el tipo exacto (número) que espera tu modelo Cliente
    const nuevoCliente = await crearCliente({
      codigoCliente: siguienteCodigo, // Asignado como número directo
      nombreCliente: nombre,
      direccionCliente: direccion,
      telefonoCliente: telefono,
    } as Cliente);

    res.status(201).json(nuevoCliente);
  } catch (error) {
    console.error('Error al registrar cliente:', error);
    res.status(500).json({ mensaje: 'Error interno al registrar el cliente' });
  }
}