import { Component, ViewChild } from '@angular/core';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { Cliente } from './models/cliente.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClienteFormComponent, ClienteListComponent],
  template: `
    <div class="page">
      <header class="page__header">
        <span class="page__eyebrow">Registro de clientes</span>
        <h1 class="page__title">Gestión de Clientes</h1>
      </header>

      <main class="page__grid">
        <app-cliente-form (clienteCreado)="onClienteCreado($event)"></app-cliente-form>
        <app-cliente-list #listaClientes></app-cliente-list>
      </main>
    </div>
  `,
  styles: [`
    .page {
      max-width: 1100px;
      margin: 0 auto;
      padding: 2.5rem 1.5rem 4rem;
    }

    .page__header {
      margin-bottom: 2rem;
      border-bottom: 1px solid var(--line);
      padding-bottom: 1.25rem;
    }

    .page__eyebrow {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--teal);
    }

    .page__title {
      font-size: 2.25rem;
      font-weight: 600;
      margin-top: 0.35rem;
    }

    .page__grid {
      display: grid;
      grid-template-columns: 340px 1fr;
      gap: 2rem;
      align-items: start;
    }

    @media (max-width: 780px) {
      .page__grid {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class AppComponent {
  @ViewChild('listaClientes') listaClientes!: ClienteListComponent;

  onClienteCreado(_cliente: Cliente): void {
    this.listaClientes.cargarClientes();
  }
}