import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PrincipalComponent} from './principal/principal.component';
import { MembresiaModule } from './view/membresia/membresia.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: 'login', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'principal', component: PrincipalComponent,
  data: {
    title: 'Inicio',
  },
  children:[
    {
      path: 'venta',
      // tslint:disable-next-line: object-literal-sort-keys
      loadChildren: ()  =>  import('./view/venta/venta.module').then(m  =>  m.VentaModule),
      //canActivate: [AuthGuard]
    },
    {
      path: 'cocina',
      // tslint:disable-next-line: object-literal-sort-keys
      loadChildren: ()  =>  import('./view/cocina/cocina.module').then(m  =>  m.CocinaModule),
      //canActivate: [AuthGuard]
    },
    {
      path: 'caja',
      // tslint:disable-next-line: object-literal-sort-keys
      loadChildren: ()  =>  import('./view/caja/caja.module').then(m  =>  m.CajaModule),
      //canActivate: [AuthGuard]
    },
    {
      path: 'mantenimiento',
      // tslint:disable-next-line: object-literal-sort-keys
      loadChildren: ()  =>  import('./view/mantenimiento/mantenimiento.module').then(m  =>  m.MantenimientoModule ),
      //canActivate: [AuthGuard]
    },
    {
      path: 'almacen',
      // tslint:disable-next-line: object-literal-sort-keys
      loadChildren: ()  =>  import('./view/almacen/almacen.module').then(m  =>  m.AlmacenModule ),
      //canActivate: [AuthGuard]
    },
    {
      path: 'seguridad',
      // tslint:disable-next-line: object-literal-sort-keys
      loadChildren: ()  =>  import('./view/seguridad/seguridad.module').then(m  =>  m.SeguridadModule ),
      //canActivate: [AuthGuard]
    },
    {
      path: 'empleado',
      // tslint:disable-next-line: object-literal-sort-keys
      loadChildren: ()  =>  import('./view/empleado/empleado.module').then(m  =>  m.EmpleadoModule ),
      //canActivate: [AuthGuard]
    },
    
    {
      path: 'reporte',
      // tslint:disable-next-line: object-literal-sort-keys
      loadChildren: ()  =>  import('./view/reporte/reporte.module').then(m  =>  m.ReporteModule ),
      //canActivate: [AuthGuard]
    },
    {
      path: 'membresia',
      loadChildren: () => import('./view/membresia/membresia.module').then(m  =>  m.MembresiaModule ),
    }
  ]
},





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
