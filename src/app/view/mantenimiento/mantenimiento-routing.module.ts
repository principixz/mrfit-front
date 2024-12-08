import { NgModule, Component } from '@angular/core';
// tslint:disable-next-line: ordered-imports
import { RouterModule, Routes } from '@angular/router';
import {RegistroComponent} from '../venta/registro/registro.component';
import{ListaComponent} from './tipo_documento/lista/lista.component';
import {NuevoComponent} from './tipo_documento/nuevo/nuevo.component';
import{ListaComponent_tipo} from './marca_producto/lista/lista.component';
import {NuevoComponentMarca} from './marca_producto/nuevo/nuevo.component';
import {ListaComponentMoneda} from './tipo_moneda/lista/lista.component';
import {NuevoTipoMonedaComponent} from './tipo_moneda/nuevo/nuevo.component';

import {ListaUbicacionmesaComponent} from './ubicacionmesa/lista/lista.component';
import {NuevoUbicacionmesaComponent} from './ubicacionmesa/nuevo/nuevo.component';
import { ListacategoriaComponent } from './categoria_producto/listacategoria/listacategoria.component';
import { NuevocategoriaComponent } from './categoria_producto/nuevocategoria/nuevocategoria.component';
import { ListaunidadmedidaComponent } from './unidadmedida/listaunidadmedida/listaunidadmedida.component';
import {NuevaunidadmedidaComponent } from './unidadmedida/nuevaunidadmedida/nuevaunidadmedida.component';
import { ListamesaComponent } from './mesa/listamesa/listamesa.component';
import { NuevamesaComponent } from './mesa/nuevamesa/nuevamesa.component';
import { EditarmesaComponent } from './mesa/editarmesa/editarmesa.component';
import {RegistrocomprobanteComponent} from './registrocomprobante/registrocomprobante.component';

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
        path: 'tipo_documento/lista',
        // tslint:disable-next-line: object-literal-sort-keys
        component : ListaComponent,
        data: {
          title: 'lista tipo Documento',
        },
      },

      {
        path: 'tipo_documento/nuevo',
        // tslint:disable-next-line: object-literal-sort-keys
        component : NuevoComponent,
        data: {
          title: 'NUEVO TIPO DOCUMENTO',
        },
      },

      {
        path: 'tipo_documento/editar/:id',
        // tslint:disable-next-line: object-literal-sort-keys
        component : NuevoComponent,
        data: {
          title: 'EDITAR TIPO DOCUMENTO',
        },
      },

      {
        path: 'marca_producto/lista',
        // tslint:disable-next-line: object-literal-sort-keys
        component : ListaComponent_tipo,
        data: { 
          title: 'lista tipo Documento',
        },
      },

      {
        path: 'marca_producto/nuevo',
        // tslint:disable-next-line: object-literal-sort-keys
        component : NuevoComponentMarca,
        data: {
          title: 'NUEVA MARCA DE PRODUCTO',
        },
      },
      
      {
        path: 'marca_producto/editar/:id',
        // tslint:disable-next-line: object-literal-sort-keys
        component : NuevoComponentMarca,
        data: {
          title: 'EDITAR MARCA DE PRODUCTO',
        },
      },

      {
        path: 'tipo_moneda/lista',
        // tslint:disable-next-line: object-literal-sort-keys
        component : ListaComponentMoneda,
        data: { 
          title: 'lista tipo moneda',
        },
      },

      

      {
        path: 'tipo_moneda/nuevo',
        // tslint:disable-next-line: object-literal-sort-keys
        component : NuevoTipoMonedaComponent,
        data: { 
          title: 'NUEVO TIPO DE MONEDA',
        },
      },
      {
        path: 'tipo_moneda/editar/:id',
        // tslint:disable-next-line: object-literal-sort-keys
        component : NuevoTipoMonedaComponent,
        data: {
          title: 'EDITAR TIPO DE MONEDA',
        },
      },

      
      {
        path: 'ubicacionmesa/lista',
        // tslint:disable-next-line: object-literal-sort-keys
        component : ListaUbicacionmesaComponent,
        data: { 
          title: 'LISTA UBICACIÓN DE MESA',
        },
      },

      

      {
        path: 'ubicacionmesa/nuevo',
        // tslint:disable-next-line: object-literal-sort-keys
        component : NuevoUbicacionmesaComponent,
        data: { 
          title: 'NUEVO UBICACION DE MESA',
        },
      },
      {
        path: 'ubicacionmesa/editar/:id',
        // tslint:disable-next-line: object-literal-sort-keys
        component : NuevoUbicacionmesaComponent,
        data: {
          title: 'EDITAR UBICACION DE MESA',
        },
      },

       
      {
        path: 'categoriaproducto/lista',
        // tslint:disable-next-line: object-literal-sort-keys
        component : ListacategoriaComponent,
        data: { 
          title: 'LISTA DE CATEGORIAS DE PRODUCTOS',
        },
      },
      {
        path: 'categoriaproducto/nuevo',
        // tslint:disable-next-line: object-literal-sort-keys
        component : NuevocategoriaComponent,
        data: { 
          title: 'NUEVA CATEGORIA DE PRODUCTO',
        },
      },
      {
        path: 'categoriaproducto/editar/:id',
        // tslint:disable-next-line: object-literal-sort-keys
        component : NuevocategoriaComponent,
        data: {
          title: 'EDITAR CATEGORIA DE PRODUCTO',
        },
      },





        
      {
        path: 'unidadmedida/lista',
        // tslint:disable-next-line: object-literal-sort-keys
        component : ListaunidadmedidaComponent,
        data: { 
          title: 'LISTA DE UNIDAD DE MEDIDAS',
        },
      },
      {
        path: 'unidadmedida/nuevo',
        // tslint:disable-next-line: object-literal-sort-keys
        component : NuevaunidadmedidaComponent,
        data: { 
          title: 'NUEVA UNIDAD DE MEDIDA',
        },
      },
      {
        path: 'unidadmedida/editar/:id',
        // tslint:disable-next-line: object-literal-sort-keys
        component : NuevaunidadmedidaComponent,
        data: {
          title: 'EDITAR UNIDAD DE MEDIDA',
        },
      },
      

         
      {
        path: 'mesa/lista',
        // tslint:disable-next-line: object-literal-sort-keys
        component : ListamesaComponent,
        data: { 
          title: 'LISTA DE MESAS',
        },
      },
      {
        path: 'mesa/nuevo',
        // tslint:disable-next-line: object-literal-sort-keys
        component : NuevamesaComponent,
        data: { 
          title:'CREACIÓN DE MESAS',
        },
      },

      {
        path: 'mesa/editar/:id',
        // tslint:disable-next-line: object-literal-sort-keys
        component : EditarmesaComponent,
        data: {
          title: 'EDITAR MESA',
        },
      },
      {
        path:'registrocomprobante',
        component:RegistrocomprobanteComponent,
        data: {
          title: 'REGISTRO DE DATOS',
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
  export class MantenimientoRoutingModule { }
