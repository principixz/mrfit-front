import { NgModule, Component } from '@angular/core';
// tslint:disable-next-line: ordered-imports
import { RouterModule, Routes } from '@angular/router';
import { ReporteVentaComponent } from './reporte-venta/reporte-venta.component';
import { TablaVentaComponent } from './tabla-venta/tabla-venta.component';
import { ReporteEmpleadoComponent } from './reporte-empleado/reporte-empleado.component';

const routes: Routes = [
  {
    path: '',
    // tslint:disable-next-line: object-literal-sort-keys
    data  : {
      title: 'Reporte',
    },
    children: [
     
  
      {
        path: 'reporteventa/reporte',
        // tslint:disable-next-line: object-literal-sort-keys
        component : ReporteVentaComponent,
        data: {
          title: 'Reporte Venta',
        },
      },
      
      {
        path: 'tablaventa/reporte',
        // tslint:disable-next-line: object-literal-sort-keys
        component : TablaVentaComponent,
        data: {
          title: 'Reporte Venta',
        },
      },
      
      {
        path: 'graficoempleado/reporte',
        // tslint:disable-next-line: object-literal-sort-keys
        component : ReporteEmpleadoComponent,
        data: {
          title: 'Grafico Empleado',
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
  export class ReporteRoutingModule { }
