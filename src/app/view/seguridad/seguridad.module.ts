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
import {MatSelectModule} from '@angular/material/select';
import { Select2Module } from 'ng-select2-component';
import {SeguridadRoutingModule} from './seguridad-routing.module';
import { ModulolistaComponent } from './modulolista/modulolista.component';
import { PerfilistaComponent } from './perfilista/perfilista.component';
import { PermisoslistaComponent } from './permisoslista/permisoslista.component';
import { ModulonuevoComponent } from './modulonuevo/modulonuevo.component';

import { PerfilnuevoComponent } from './perfilnuevo/perfilnuevo.component';
@NgModule({
    imports: [FormsModule, ReactiveFormsModule, MatCardModule, PrincipalModule, MatButtonModule, MatSelectModule, MatIconModule, MatInputModule, CommonModule,
        MatFormFieldModule, MatSortModule, MatPaginatorModule, MatTableModule, SeguridadRoutingModule, Select2Module
    ],
    providers: [
        CurrencyPipe,
    ],
    // tslint:disable-next-line: object-literal-sort-keys
    declarations: [
        ModulolistaComponent,
        PerfilistaComponent,
        PermisoslistaComponent,
        ModulonuevoComponent,
        PerfilnuevoComponent
    ]
})
  export class SeguridadModule { }
