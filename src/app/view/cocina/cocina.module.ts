import { CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import {FormsModule,  ReactiveFormsModule} from '@angular/forms';
import {RegistroComponent} from '../venta/registro/registro.component';
import  {CocinaRoutingModule} from './cocina-routing.module';
import {CocinaComponent} from './cocina/cocina.component';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import{MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatBadgeModule} from '@angular/material/badge';
import { LuxonModule } from 'luxon-angular';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DateFnsConfigurationService, DateFnsModule } from 'ngx-date-fns';
import {MatInputModule} from '@angular/material/input';
import { es } from "date-fns/locale";
import { PlatoDesactivarComponent } from './plato-desactivar/plato-desactivar.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
const frenchConfig = new DateFnsConfigurationService();
frenchConfig.setLocale(es);
@NgModule({
    imports: [MatSlideToggleModule, MatInputModule, MatSnackBarModule, DateFnsModule.forRoot(), LuxonModule, MatBadgeModule, MatDividerModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatSortModule, MatTableModule,
        CocinaRoutingModule, CommonModule, ReactiveFormsModule, FormsModule, MatCardModule, MatSelectModule, Ng2SearchPipeModule
    ],
    providers: [
        CurrencyPipe,
    ],
    // tslint:disable-next-line: object-literal-sort-keys
    declarations: [
        CocinaComponent,
        PlatoDesactivarComponent
    ]
})
  export class CocinaModule { }
