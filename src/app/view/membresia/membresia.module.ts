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
import { MembresiaRoutingModule } from './membresia-routing.module';
import { TipoMembresiaComponent } from './tipo-membresia/listamembresia/tipo-membresia.component';
import { NuevamembresiaComponent } from './tipo-membresia/nuevamembresia/nuevamembresia.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListaventaMembresiaComponent } from './ventaservicio/listaventa-membresia/listaventa-membresia.component';
import { NuevaventaMembresiaComponent } from './ventaservicio/nuevaventa-membresia/nuevaventa-membresia.component'; 


//

import { DateFnsConfigurationService, DateFnsModule } from 'ngx-date-fns';
import {MatMenuModule} from '@angular/material/menu';
import { es } from "date-fns/locale";
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatDialogModule} from '@angular/material/dialog';
import { NgSelect2Module } from 'ng-select2';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

const frenchConfig = new DateFnsConfigurationService();
frenchConfig.setLocale(es);
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { HttpClientModule } from  '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import {MatExpansionModule} from '@angular/material/expansion';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ModalServicioCliente } from './ventaservicio/nuevaventa-membresia/modalclientes.component';

import { ClientenewComponent } from './clientenew/clientenew.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ValidarAsistenciaComponent } from './validar-asistencia/validar-asistencia.component';
import { FirstTabComponent } from './clientenew/first-tab/first-tab.component';
import { SecondTabComponent } from './clientenew/second-tab/second-tab.component';
import { ThirdTabComponent } from './clientenew/third-tab/third-tab.component';
import { FourTabComponent } from './clientenew/four-tab/four-tab.component';
import { ModalVerificacionComponent } from './clientenew/modal-verificacion/modal-verificacion.component'; 

@NgModule({
    imports: [FormsModule, ReactiveFormsModule, MatCardModule, PrincipalModule, MatButtonModule, MatSelectModule, MatIconModule, MatInputModule, CommonModule,
        MatFormFieldModule, MatSortModule, MatPaginatorModule, MatTableModule, MembresiaRoutingModule, Select2Module,MatNativeDateModule,MatDatepickerModule,
        MatSnackBarModule,DateFnsModule.forRoot(),MatMenuModule,MatBottomSheetModule,MatListModule,Ng2SearchPipeModule,MatDialogModule,NgSelect2Module,MatButtonToggleModule,
        MatCheckboxModule,NgxMatSelectSearchModule,DataTablesModule,MatExpansionModule,MatAutocompleteModule,
                // Agregar los módulos de Angular Material aquí
        MatTabsModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatBadgeModule
    ],
    providers: [
        CurrencyPipe,
    ],
    // tslint:disable-next-line: object-literal-sort-keys
    declarations: [
    TipoMembresiaComponent,
    NuevamembresiaComponent,
    ListaventaMembresiaComponent,
    NuevaventaMembresiaComponent,
    ModalServicioCliente,
    ClientenewComponent,
    ClienteComponent,
    ValidarAsistenciaComponent,
    FirstTabComponent,
    SecondTabComponent,
    ThirdTabComponent,
    FourTabComponent,
    ModalVerificacionComponent
  ]
})
export class MembresiaModule { }