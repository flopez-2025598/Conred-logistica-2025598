import { pool } from '../config/database';
import { Cliente } from '../models/Cliente';

// Convierte una fila de PostgreSQL (snake_case) al modelo TypeScript (camelCase)
function mapRowToCliente(row: any): Cliente {
  return {
    codigoCliente: row.codigo_cliente,
    nombreCliente: row.nombre_cliente,
    direccionCliente: row.direccion_cliente,
    telefonoCliente: row.telefono_cliente,
  };
}

export async function obtenerClientes(): Promise<Cliente[]> {
  const resultado = await pool.query('SELECT * FROM clientes ORDER BY codigo_cliente ASC');
  return resultado.rows.map(mapRowToCliente);
}

export async function obtenerClientePorId(codigoCliente: number): Promise<Cliente | null> {
  const resultado = await pool.query(
    'SELECT * FROM clientes WHERE codigo_cliente = $1',
    [codigoCliente]
  );

  if (resultado.rows.length === 0) {
    return null;
  }

  return mapRowToCliente(resultado.rows[0]);
}

export async function crearCliente(cliente: Cliente): Promise<Cliente> {
  const { codigoCliente, nombreCliente, direccionCliente, telefonoCliente } = cliente;

  const resultado = await pool.query(
    `INSERT INTO clientes (codigo_cliente, nombre_cliente, direccion_cliente, telefono_cliente)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [codigoCliente, nombreCliente, direccionCliente, telefonoCliente]
  );

  return mapRowToCliente(resultado.rows[0]);
}