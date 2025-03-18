import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';
import {FormsModule,  ReactiveFormsModule} from '@angular/forms';
import  {CajaRoutingModule} from './caja-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import{MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { DatablematerialComponent } from '../../componente/datablematerial/datablematerial.component';
import { ListaComponent } from './concepto/lista/lista.component';
import {PrincipalModule} from '../principal.module';
import { NuevoComponent } from './concepto/nuevo/nuevo.component';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {RouterModule} from '@angular/router';
import { PedidoComponent,CanjePedidoModalComponent,EliminarPedidoModalComponent,EditarPedidoModalComponent,EliminarDetalleModalComponent } from './pedido/pedido.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { SesionCajaComponent,NgbdModalContent, NgbdModalContent1, NgbdModalContent2 } from './sesion-caja/sesion-caja.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartModule } from 'angular-highcharts';
import { DateFnsConfigurationService, DateFnsModule } from 'ngx-date-fns';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { es } from "date-fns/locale";
import {MatDialogModule } from '@angular/material/dialog' ;'@material/button';
import {MatBadgeModule} from '@angular/material/badge';
const frenchConfig = new DateFnsConfigurationService();
frenchConfig.setLocale(es);

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsPe from '@angular/common/locales/es-PE';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';

import {MatMenuModule} from '@angular/material/menu';
import { GestionmovimientoComponent } from './gestionmovimiento/gestionmovimiento.component';
import { HistorialcajaComponent } from './historialcaja/historialcaja.component';
registerLocaleData(localeEsPe, 'es-Pe');
@NgModule({
    imports: [MatDialogModule, MatSnackBarModule, DateFnsModule.forRoot(), 
        ChartModule, HighchartsChartModule, 
        MatButtonToggleModule, NgbModule, RouterModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatCardModule, CajaRoutingModule, PrincipalModule, MatButtonModule, MatIconModule, MatInputModule, CommonModule,
        MatFormFieldModule, MatSortModule, MatPaginatorModule, MatTableModule, MatDividerModule, MatProgressSpinnerModule, MatMenuModule, MatBadgeModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'es-Pe' },
        CurrencyPipe,
    ],
    // tslint:disable-next-line: object-literal-sort-keys
    declarations: [CanjePedidoModalComponent,
        EditarPedidoModalComponent, EliminarDetalleModalComponent,
        ListaComponent,
        NuevoComponent,
        PedidoComponent,
        SesionCajaComponent, NgbdModalContent, NgbdModalContent1, NgbdModalContent2, EliminarPedidoModalComponent, GestionmovimientoComponent, HistorialcajaComponent
    ]
})
  export class CajaModule { }
