import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { TipoMembresiaComponent } from './tipo-membresia/listamembresia/tipo-membresia.component';
import { NuevamembresiaComponent } from './tipo-membresia/nuevamembresia/nuevamembresia.component';
import { NuevaventaMembresiaComponent } from './ventaservicio/nuevaventa-membresia/nuevaventa-membresia.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClientenewComponent } from './clientenew/clientenew.component';
import { ValidarAsistenciaComponent } from './validar-asistencia/validar-asistencia.component';

const routes: Routes = [
    {
        path: '',
        data  : {
            title: 'Membresia',
        },
        children: [
            {
                path: '',
                redirectTo: 'membresia',
            },
            {
                path: 'tipo_membresia/lista',
                // tslint:disable-next-line: object-literal-sort-keys
                component : TipoMembresiaComponent,
                data: {
                title: 'Lista Membresias',
                },
            },
            {
                path: 'tipo_membresia/editar/:id',
                // tslint:disable-next-line: object-literal-sort-keys
                component : NuevamembresiaComponent,
                data: {
                  title: 'Editar Tipo Membresia',
                },
            },
            {
                path: 'tipo_membresia/nuevo',
                // tslint:disable-next-line: object-literal-sort-keys
                component : NuevamembresiaComponent,
                data: {
                  title: 'Editar Tipo Membresia',
                },
            },
            {
                path: 'ventaservicio/nuevo',
                // tslint:disable-next-line: object-literal-sort-keys
                component : NuevaventaMembresiaComponent,
                data: {
                  title: 'Editar Tipo Membresia',
                },
            },
            {
                path: 'clientes',
                // tslint:disable-next-line: object-literal-sort-keys
                component : ClienteComponent,
                data: {
                  title: 'lista Clientes',
                },
              },
        
              {
                path: 'clientes/nuevo',
                // tslint:disable-next-line: object-literal-sort-keys
                component : ClientenewComponent,
                data: {
                  title: 'NUEVO CLIENTE',
                },
              },
              {
                path: 'clientes/editar/:id',
                // tslint:disable-next-line: object-literal-sort-keys
                component : ClientenewComponent,
                data: {
                  title: 'EDITAR CLIENTE',
                },
              },
              {
                path: 'validarasistencia',
                // tslint:disable-next-line: object-literal-sort-keys
                component : ValidarAsistenciaComponent,
                data: {
                  title: 'lista Clientes',
                },
              },
        ] 
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    // tslint:disable-next-line: object-literal-sort-keys
    exports: [RouterModule],
  })
  export class MembresiaRoutingModule { }
