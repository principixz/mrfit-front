import { NgModule, Component } from '@angular/core';
// tslint:disable-next-line: ordered-imports
import { RouterModule, Routes } from '@angular/router';
import { AlmacenComponent } from './almacen/almacen.component';
import { AlmacenNuevoComponent } from './almacen-nuevo/almacen-nuevo.component';
const routes: Routes = [
  {
    path: '',
    // tslint:disable-next-line: object-literal-sort-keys
    data  : {
      title: 'Almacen',
    },
    children: [
      {
        path: '',
        redirectTo: 'almacen',
      },
      {
        path: 'almacen',
        // tslint:disable-next-line: object-literal-sort-keys
        component : AlmacenComponent,
        data: {
          title: 'Almacen',
        },
      },
      {
        path: 'almacen/nuevo',
        // tslint:disable-next-line: object-literal-sort-keys
        component : AlmacenNuevoComponent,
        data: {
          title: 'Almacen Nuevo',
        },
      },
      {
        path: 'almacen/editar/:id',
        // tslint:disable-next-line: object-literal-sort-keys
        component : AlmacenNuevoComponent,
        data: {
          title: 'Almacen Editar',
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
  export class AlmacenRoutingModule { }