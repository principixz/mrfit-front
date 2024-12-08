import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';
import {FormsModule,  ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import{MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { DatablematerialComponent } from '../../componente/datablematerial/datablematerial.component';
import {PrincipalModule} from '../principal.module';
import {MantenimientoRoutingModule} from './mantenimiento-routing.module';
import { ListaComponent } from './tipo_documento/lista/lista.component';
import { NuevoComponent } from './tipo_documento/nuevo/nuevo.component';
import{ListaComponent_tipo} from './marca_producto/lista/lista.component';
import{NuevoComponentMarca} from './marca_producto/nuevo/nuevo.component';
import {ListaComponentMoneda} from './tipo_moneda/lista/lista.component';
import {NuevoTipoMonedaComponent} from './tipo_moneda/nuevo/nuevo.component';
import {ListaUbicacionmesaComponent} from './ubicacionmesa/lista/lista.component';
import {NuevoUbicacionmesaComponent} from './ubicacionmesa/nuevo/nuevo.component';
import { ListacategoriaComponent } from './categoria_producto/listacategoria/listacategoria.component';
import { NuevocategoriaComponent } from './categoria_producto/nuevocategoria/nuevocategoria.component';
import { ListaunidadmedidaComponent } from './unidadmedida/listaunidadmedida/listaunidadmedida.component';
import { NuevaunidadmedidaComponent } from './unidadmedida/nuevaunidadmedida/nuevaunidadmedida.component';
import { ListamesaComponent } from './mesa/listamesa/listamesa.component';
import { NuevamesaComponent } from './mesa/nuevamesa/nuevamesa.component';
import { EditarmesaComponent } from './mesa/editarmesa/editarmesa.component';
import {MatSelectModule} from '@angular/material/select';
import { RegistrocomprobanteComponent } from './registrocomprobante/registrocomprobante.component';
import {MatTabsModule} from '@angular/material/tabs';
@NgModule({
    imports: [FormsModule, ReactiveFormsModule, MatCardModule, PrincipalModule, MatButtonModule, MatIconModule, MatInputModule, CommonModule,
        MatFormFieldModule, MatSortModule, MatPaginatorModule, MatTableModule, MantenimientoRoutingModule, MatSelectModule, MatTabsModule
    ],
    providers: [
        CurrencyPipe,
    ],
    // tslint:disable-next-line: object-literal-sort-keys
    declarations: [NuevoTipoMonedaComponent,
        NuevoComponentMarca,
        ListaComponentMoneda, ListaUbicacionmesaComponent, NuevoUbicacionmesaComponent,
        ListaComponent_tipo,
        ListaComponent,
        NuevoComponent,
        ListacategoriaComponent,
        NuevocategoriaComponent,
        ListaunidadmedidaComponent,
        NuevaunidadmedidaComponent,
        ListamesaComponent,
        NuevamesaComponent,
        EditarmesaComponent,
        RegistrocomprobanteComponent
    ]
})
  export class MantenimientoModule { }
