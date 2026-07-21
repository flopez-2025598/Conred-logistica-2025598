import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="clienteForm" (ngSubmit)="onSubmit()">
      <h2>Registrar Cliente</h2>

      <div>
        <label for="nombreCliente">Nombre:</label>
        <input id="nombreCliente" type="text" formControlName="nombreCliente" />
        @if (clienteForm.get('nombreCliente')?.invalid && clienteForm.get('nombreCliente')?.touched) {
          <span class="error">El nombre es obligatorio</span>
        }
      </div>

      <div>
        <label for="direccionCliente">Dirección:</label>
        <input id="direccionCliente" type="text" formControlName="direccionCliente" />
        @if (clienteForm.get('direccionCliente')?.invalid && clienteForm.get('direccionCliente')?.touched) {
          <span class="error">La dirección es obligatoria</span>
        }
      </div>

      <div>
        <label for="telefonoCliente">Teléfono:</label>
        <input id="telefonoCliente" type="text" formControlName="telefonoCliente" />
        @if (clienteForm.get('telefonoCliente')?.invalid && clienteForm.get('telefonoCliente')?.touched) {
          <span class="error">El teléfono es obligatorio</span>
        }
      </div>

      <button type="submit" [disabled]="clienteForm.invalid">Registrar</button>

      @if (mensajeExito) {
        <p class="exito">{{ mensajeExito }}</p>
      }
      @if (mensajeError) {
        <p class="error">{{ mensajeError }}</p>
      }
    </form>
  `,
})
export class ClienteFormComponent {
  @Output() clienteCreado = new EventEmitter<Cliente>();

  clienteForm: FormGroup;
  mensajeExito = '';
  mensajeError = '';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) {
    this.clienteForm = this.fb.group({
      nombreCliente: ['', Validators.required],
      direccionCliente: ['', Validators.required],
      telefonoCliente: ['', Validators.required],
    });
  }

 onSubmit(): void {
    if (this.clienteForm.invalid) {
      return;
    }

    this.mensajeExito = '';
    this.mensajeError = '';

    const valoresForm = this.clienteForm.value;

    // Mapeamos al formato plano que espera el backend
    const clienteMapeado: any = {
      nombre: valoresForm.nombreCliente,
      direccion: valoresForm.direccionCliente,
      telefono: valoresForm.telefonoCliente
    };

    this.clienteService.crearCliente(clienteMapeado).subscribe({
      next: (clienteCreado: any) => {
        // Usamos 'any' temporal para evitar que TypeScript proteste por los campos de la DB
        const nombreMostrado = clienteCreado.nombre || valoresForm.nombreCliente;
        
        this.mensajeExito = `Cliente "${nombreMostrado}" registrado correctamente`;
        this.clienteForm.reset();
        this.clienteCreado.emit(clienteCreado);
        
        // Refresca la ventana para actualizar la lista automáticamente
        window.location.reload();
      },
      error: (error) => {
        console.error('Error al registrar cliente:', error);
        this.mensajeError = 'Ocurrió un error al registrar el cliente';
      },
    });
  }
}