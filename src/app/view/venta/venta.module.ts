import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';
import {FormsModule,  ReactiveFormsModule} from '@angular/forms';
import {RegistroComponent,MenumesaSheet,LongPress} from '../venta/registro/registro.component';
import  {VentaRoutingModule} from './venta-routing.module';
import { ListaComponent } from './lista/lista.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import{MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { DatablematerialComponent } from '../../componente/datablematerial/datablematerial.component';
import {PrincipalModule} from '../principal.module';
import {MatTabsModule} from '@angular/material/tabs';
import { DateFnsConfigurationService, DateFnsModule } from 'ngx-date-fns';
import {MatMenuModule} from '@angular/material/menu';
import { es } from "date-fns/locale";
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import { PedidoComponent,Modalplato} from './pedido/pedido.component';
import {MatCardModule} from '@angular/material/card';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import { NgSelect2Module } from 'ng-select2';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
const frenchConfig = new DateFnsConfigurationService();
frenchConfig.setLocale(es);
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import { RegistrarPlatoComponent } from './registrar-plato/registrar-plato.component';
import { RegistrarPlatonewComponent } from './registrar-platonew/registrar-platonew.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { HttpClientModule } from  '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import {MatExpansionModule} from '@angular/material/expansion';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
@NgModule({
    imports: [MatBadgeModule,DataTablesModule, HttpClientModule,NgSelect2Module,MatButtonToggleModule,MatCheckboxModule,
      MatSelectModule,MatProgressSpinnerModule, MatDialogModule ,ReactiveFormsModule ,FormsModule,Ng2SearchPipeModule,
       MatCardModule, MatListModule,MatBottomSheetModule,MatMenuModule,
       DateFnsModule.forRoot(),MatTabsModule,PrincipalModule,MatButtonModule,MatIconModule,MatInputModule,CommonModule,
      MatFormFieldModule,  VentaRoutingModule,MatSortModule,MatPaginatorModule,MatTableModule,MatChipsModule,NgxMatSelectSearchModule,
      MatExpansionModule,MatAutocompleteModule
    ],
    providers: [
      
      CurrencyPipe,
    ],
    // tslint:disable-next-line: object-literal-sort-keys
    declarations: [MenumesaSheet,
      LongPress,
        RegistroComponent,
           ListaComponent,
           PedidoComponent,Modalplato, RegistrarPlatoComponent, RegistrarPlatonewComponent
           //,NuevoClienteModal
  ],
  /*entryComponents:[NuevoClienteModal
  
  ],*/

  })
  export class VentaModule { }
