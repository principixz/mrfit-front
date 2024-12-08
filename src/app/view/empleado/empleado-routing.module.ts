import { NgModule, Component } from '@angular/core';
// tslint:disable-next-line: ordered-imports
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado/empleado.component';

const routes: Routes = [
  {
    path: '',
    // tslint:disable-next-line: object-literal-sort-keys
    data  : {
      title: 'Empleado',
    },
    children: [
     
      {
        path: 'empleado/lista',
        // tslint:disable-next-line: object-literal-sort-keys
        component : EmpleadoComponent,
        data: {
          title: 'Reporte Venta',
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
  export class EmpleadoRoutingModule { }
