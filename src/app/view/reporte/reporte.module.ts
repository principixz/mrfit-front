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
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ReporteRoutingModule } from './reporte-routing.module';
import { ReporteVentaComponent } from './reporte-venta/reporte-venta.component';
//import { ChartModule } from 'angular-highcharts';
import { TablaVentaComponent } from './tabla-venta/tabla-venta.component';
import { DataTablesModule } from "angular-datatables";
import * as moment from 'moment';
import { ReporteEmpleadoComponent } from './reporte-empleado/reporte-empleado.component';

moment.locale('es');
@NgModule({
    imports: [DataTablesModule,FormsModule, ReactiveFormsModule, MatCardModule, PrincipalModule, MatButtonModule, MatSelectModule, MatIconModule, MatInputModule, CommonModule,
        MatFormFieldModule, MatSortModule, MatPaginatorModule, MatTableModule, Select2Module, ReporteRoutingModule,
        NgxDaterangepickerMd.forRoot({
            applyLabel: 'De acuerdo',
            customRangeLabel: 'CustomRangeLable',
            daysOfWeek: moment.weekdaysMin(),
            monthNames: moment.monthsShort(),
            firstDay: moment.localeData().firstDayOfWeek(),
          }),
        //ChartModule
    ],
    providers: [
        CurrencyPipe,
    ],
    // tslint:disable-next-line: object-literal-sort-keys
    declarations: [
        ReporteVentaComponent,
        TablaVentaComponent,
        ReporteEmpleadoComponent
    ]
})
  export class ReporteModule { }
