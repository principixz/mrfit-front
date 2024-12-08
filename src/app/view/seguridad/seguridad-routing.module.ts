import { NgModule, Component } from '@angular/core';
// tslint:disable-next-line: ordered-imports
import { RouterModule, Routes } from '@angular/router';
import {ModulolistaComponent} from './modulolista/modulolista.component';
import {PerfilistaComponent} from './perfilista/perfilista.component';
import {PermisoslistaComponent} from './permisoslista/permisoslista.component';
import {ModulonuevoComponent} from './modulonuevo/modulonuevo.component';
import {PerfilnuevoComponent} from './perfilnuevo/perfilnuevo.component';
const routes: Routes = [
  {
    path: '',
    // tslint:disable-next-line: object-literal-sort-keys
    data  : {
      title: 'Seguridad',
    },
    children: [
      {
        path: '',
        redirectTo: 'seguridad',
      },

      {
        path: 'modulo/lista',
        // tslint:disable-next-line: object-literal-sort-keys
        component : ModulolistaComponent,
        data: {
          title: 'lista Modulo',
        },
      },
      {
        path: 'modulo/nuevo',
        // tslint:disable-next-line: object-literal-sort-keys
        component : ModulonuevoComponent,
        data: {
          title: 'Nuevo Modulo',
        },
      },
      {
        path: 'modulo/editar/:id',
        // tslint:disable-next-line: object-literal-sort-keys
        component : ModulonuevoComponent,
        data: {
          title: 'Editar Modulo',
        },
      },


      {
        path: 'perfil/lista',
        // tslint:disable-next-line: object-literal-sort-keys
        component : PerfilistaComponent,
        data: {
          title: 'lista de Perfiles',
        },
      },
      {
        path: 'perfil/nuevo',
        // tslint:disable-next-line: object-literal-sort-keys
        component : PerfilnuevoComponent,
        data: {
          title: 'lista de Perfiles',
        },
        
      },
      {
        path: 'perfil/editar/:id',
        // tslint:disable-next-line: object-literal-sort-keys
        component : PerfilnuevoComponent,
        data: {
          title: 'lista de Perfiles',
        },
        
      },
      
      {
        path: 'permisos/lista',
        // tslint:disable-next-line: object-literal-sort-keys
        component : PermisoslistaComponent,
        data: {
          title: 'lista de permisos',
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
  export class SeguridadRoutingModule { }
