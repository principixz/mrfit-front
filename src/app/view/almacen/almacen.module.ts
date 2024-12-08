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
import { AlmacenRoutingModule } from './almacen-routing.module';
import { AlmacenComponent } from './almacen/almacen.component';
import { AlmacenNuevoComponent } from './almacen-nuevo/almacen-nuevo.component';

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, MatCardModule, PrincipalModule, MatButtonModule, MatIconModule, MatInputModule, CommonModule,
        MatFormFieldModule, MatSortModule, MatPaginatorModule, MatTableModule, AlmacenRoutingModule
    ],
    providers: [
        CurrencyPipe,
    ],
    // tslint:disable-next-line: object-literal-sort-keys
    declarations: [
        AlmacenComponent,
        AlmacenNuevoComponent
    ]
})
  export class AlmacenModule { }
