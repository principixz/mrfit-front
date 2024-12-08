import { NgModule, Component } from '@angular/core';
// tslint:disable-next-line: ordered-imports
import { RouterModule, Routes } from '@angular/router';

import{ListaComponent} from './concepto/lista/lista.component';
import {NuevoComponent} from  './concepto/nuevo/nuevo.component';
import {PedidoComponent} from './pedido/pedido.component';
import { SesionCajaComponent } from './sesion-caja/sesion-caja.component';
import {GestionmovimientoComponent} from './gestionmovimiento/gestionmovimiento.component';
import {HistorialcajaComponent} from './historialcaja/historialcaja.component';
const routes: Routes = [
  {
    path: '',
    // tslint:disable-next-line: object-literal-sort-keys
    data  : {
      title: 'Venta',
    },
    children: [
      {
        path: 'gestionmovimiento/lista',
        // tslint:disable-next-line: object-literal-sort-keys
        component : GestionmovimientoComponent,
        data: {
          title: 'lista Concepto',
        },
      },
      {
        path: 'historialcaja/lista',
        // tslint:disable-next-line: object-literal-sort-keys
        component : HistorialcajaComponent,
        data: {
          title: 'lista Concepto',
        },
      },
      {
        path: 'concepto/lista',
        // tslint:disable-next-line: object-literal-sort-keys
        component : ListaComponent,
        data: {
          title: 'lista Concepto',
        },
      },

      {
        path: 'concepto/nuevo',
        // tslint:disable-next-line: object-literal-sort-keys
        component : NuevoComponent,
        data: {
          title: 'NUEVO CONCEPTO',
        },
      },

      {
        path: 'concepto/editar/:id',
        // tslint:disable-next-line: object-literal-sort-keys
        component : NuevoComponent,
        data: {
          title: 'EDITAR CONCEPTO',
        },
      },

      
      {
        path: 'pedido',
        // tslint:disable-next-line: object-literal-sort-keys
        component : PedidoComponent,
        data: {
          title: 'NUEVO PEDIDO',
        },
      },
      {
        path: 'sesion_caja',
        // tslint:disable-next-line: object-literal-sort-keys
        component : SesionCajaComponent,
        data: {
          title: 'SESION DE CAJA',
        },
      },
      {
        path: 'movimiento',
        // tslint:disable-next-line: object-literal-sort-keys
        component : GestionmovimientoComponent,
        data: {
          title: 'SESION DE CAJA',
        },
      }

      
   
      
    ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    // tslint:disable-next-line: object-literal-sort-keys
    exports: [RouterModule],
  })
  export class CajaRoutingModule { }
