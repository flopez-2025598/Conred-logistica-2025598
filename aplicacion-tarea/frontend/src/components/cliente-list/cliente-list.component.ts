import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2>Listado de Clientes</h2>

      @if (clientes.length === 0) {
        <p>No hay clientes registrados todavía.</p>
      } @else {
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            @for (cliente of clientes; track cliente.codigoCliente) {
              <tr>
                <td>{{ cliente.codigoCliente }}</td>
                <td>{{ cliente.nombreCliente }}</td>
                <td>{{ cliente.direccionCliente }}</td>
                <td>{{ cliente.telefonoCliente }}</td>
              </tr>
            }
          </tbody>
        </table>
      }

      @if (mensajeError) {
        <p class="error">{{ mensajeError }}</p>
      }
    </section>
  `,
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];
  mensajeError = '';

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.obtenerClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
        this.mensajeError = 'No se pudieron cargar los clientes';
      },
    });
  }
}