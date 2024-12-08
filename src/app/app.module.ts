import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';

import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { PrincipalComponent } from './principal/principal.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {EliminarModalComponent} from './componente/datablematerial/datablematerial.component';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import { SidebarMenuModule } from 'angular-sidebar-menu';
import {SidebarModule} from 'primeng/sidebar';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';
import { SplitButtonModule } from 'primeng/splitbutton';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import {Servicio} from './servicio/servicio';

import { TRANSLOCO_LOADER, TRANSLOCO_CONFIG, translocoConfig, TranslocoModule } from '@ngneat/transloco';
import { TranslationLoaderService } from './translation-loader.service';
import { TranslocoRootModule } from './transloco-root.module';
import {MatBadgeModule} from '@angular/material/badge';
import { NgxUiLoaderConfig,  NgxUiLoaderModule,  PB_DIRECTION,   POSITION,  SPINNER } from 'ngx-ui-loader';
import { LoadingBarModule } from '@ngx-loading-bar/core';
//|import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MatPaginatorIntlES } from './matPaginatorIntlEsClass';
import { MatPaginatorModule, MatPaginatorIntl} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DatablematerialComponent } from './componente/datablematerial/datablematerial.component';

import {Var_menu} from "./variable_globales/var_menu";
import {PrincipalModule} from './view/principal.module';
import {  LOCALE_ID } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MAT_DATE_LOCALE } from '@angular/material/core';
registerLocaleData(es);
const ngxUiLoaderConfig: NgxUiLoaderConfig ={
  "bgsColor": "#4a9854",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin-clockwise",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#4a9854",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "ball-spin-clockwise",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "#4a9854",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "PROCESANDO...",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
};



@NgModule({
  exports:[
  
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    EliminarModalComponent
  ],
  imports: [PrincipalModule,MatSnackBarModule,MatTooltipModule,MatDialogModule,CommonModule,MatSortModule,
    MatPaginatorModule,MatTableModule,SimpleNotificationsModule,MatFormFieldModule,MatDividerModule,MatMenuModule,LoadingBarModule,
    MatSidenavModule,MatSelectModule,HttpClientModule,SidebarMenuModule,SidebarModule,SplitButtonModule,ToolbarModule,InputTextModule,ButtonModule,
    BreadcrumbModule,MatIconModule,MatInputModule,MatCardModule,
    FormsModule, ReactiveFormsModule ,MatButtonModule,
    BrowserModule,
    AppRoutingModule,MatBadgeModule,
    BrowserAnimationsModule,MenubarModule,
    NgbModule,   NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
    ,  ToastrModule.forRoot({

    }),
    NgxDaterangepickerMd.forRoot({}),
    // LoadingBarRouterModule,
    //LoadingBarRouterModule,
    
    MatListModule,

    TranslocoRootModule
  ], 
  bootstrap: [ AppComponent ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
      Servicio,Var_menu,
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'fr','es'],
        defaultLang: 'es',
        reRenderOnLangChange: true,
        prodMode: environment.production,
      }),
    },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlES}
    ]  })
  export class AppModule { }