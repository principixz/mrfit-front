import { NgModule, Component } from '@angular/core';
// tslint:disable-next-line: ordered-imports
import { RouterModule, Routes } from '@angular/router';
import {CocinaComponent} from './cocina/cocina.component';
import { PlatoDesactivarComponent } from './plato-desactivar/plato-desactivar.component';
const routes: Routes = [
  {
    path: '',
    // tslint:disable-next-line: object-literal-sort-keys
    data  : {
      title: 'Cocina',
    },
    children: [
      {
        path: '',
        redirectTo: 'cocina',
      },
      {
        path: 'cocina',
        // tslint:disable-next-line: object-literal-sort-keys
        component : CocinaComponent,
        data: {
          title: 'Cocina',
        },
      },
      {
        path: 'plato_desactivar',
        // tslint:disable-next-line: object-literal-sort-keys
        component : PlatoDesactivarComponent,
        data: {
          title: 'Cocina',
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
  export class CocinaRoutingModule { }
