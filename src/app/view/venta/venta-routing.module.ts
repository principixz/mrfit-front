import { NgModule, Component } from '@angular/core';
// tslint:disable-next-line: ordered-imports
import { RouterModule, Routes } from '@angular/router';
import {RegistroComponent} from '../venta/registro/registro.component';
import{ListaComponent} from './lista/lista.component';
import { PedidoComponent } from './pedido/pedido.component';
import { RegistrarPlatoComponent } from './registrar-plato/registrar-plato.component';
import { RegistrarPlatonewComponent } from './registrar-platonew/registrar-platonew.component';
import { NuevaventaMembresiaComponent } from '../membresia/ventaservicio/nuevaventa-membresia/nuevaventa-membresia.component';
const routes: Routes = [
  {
    path: '',
    // tslint:disable-next-line: object-literal-sort-keys
    data  : {
      title: 'Venta',
    },
    children: [
      {
        path: '',
        redirectTo: 'Venta_mesa',
      },
      {
        path: 'Venta_mesa',
        // tslint:disable-next-line: object-literal-sort-keys
        component : NuevaventaMembresiaComponent,
        data: {
          title: 'servicio',
        },
      },
      {
        path: 'lista_venta',
        // tslint:disable-next-line: object-literal-sort-keys
        component : ListaComponent,
        data: {
          title: 'lista ventas',
        },
      },

      {
        path: 'Pedido/:idventa/:idmesa/:nombremesa',
        // tslint:disable-next-line: object-literal-sort-keys
        component : PedidoComponent,
        data: {
          title: 'servicio',
        },
      },



      {
        path: 'registrar_plato',
        // tslint:disable-next-line: object-literal-sort-keys
        component : RegistrarPlatoComponent,
        data: {
          title: 'Lista Platos',
        },
      },

      {
        path: 'registrar_plato/nuevo',
        // tslint:disable-next-line: object-literal-sort-keys
        component : RegistrarPlatonewComponent,
        data: {
          title: 'NUEVO PLATO',
        },
      },
      
   
      
    ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    // tslint:disable-next-line: object-literal-sort-keys
    exports: [RouterModule],
  })
  export class VentaRoutingModule { }
