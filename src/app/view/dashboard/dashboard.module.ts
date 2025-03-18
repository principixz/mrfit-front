import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component'; 
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button'; 
import { TotalSalesComponent } from './ecommerce/total-sales/total-sales.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select'; 
import { WelcomeComponent } from './ecommerce/welcome/welcome.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TotalOrdersComponent } from './ecommerce/total-orders/total-orders.component';
import { TopSellersComponent } from './ecommerce/top-sellers/top-sellers.component';
import { RecentLeadsComponent } from './ecommerce/recent-leads/recent-leads.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RenovadosComponent } from './ecommerce/renovados-today/recent-leads.component';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    DashboardComponent, 
    TotalSalesComponent,
    WelcomeComponent,
    TotalOrdersComponent,
    TopSellersComponent,
    RecentLeadsComponent,
    RenovadosComponent
  ],
  imports: [ 
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule, 
    MatFormFieldModule,
    NgApexchartsModule,
    HighchartsChartModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
})
export class DashboardModule { }