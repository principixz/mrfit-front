import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';
import {DatablematerialComponent} from '../componente/datablematerial/datablematerial.component'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import { ModalVenta } from '../modal/modalventa/modalventa.component';
import { ModalMesa } from '../modal/modalmesa/modalmesa.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgSelect2Module } from 'ng-select2';
import { ReactiveFormsModule } from '@angular/forms';
import { NuevoClienteModal } from '../modal/nuevocliente/nuevocliente.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CurrencyMaskModule } from "ng2-currency-mask";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import { Modalboleta } from '../modal/modalventa/modalventa.component';

import { SafePipe } from '../modal/modalventa/modalventa.component';
import { ModalServicio } from '../modal/modalServicio/modalServicio.component'; 

@NgModule({
    declarations: [DatablematerialComponent, ModalVenta, NuevoClienteModal, ModalMesa, Modalboleta, SafePipe, ModalServicio],
    exports: [DatablematerialComponent, ModalVenta,ModalServicio],
    imports: [MatCheckboxModule, NgSelect2Module, RouterModule, CommonModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatTableModule, MatIconModule, MatPaginatorModule,
        MatButtonToggleModule, MatInputModule, CommonModule, ReactiveFormsModule, FullCalendarModule, CurrencyMaskModule, MatDialogModule, MatProgressSpinnerModule, MatBadgeModule,
        MatFormFieldModule]
})
  export class PrincipalModule { }