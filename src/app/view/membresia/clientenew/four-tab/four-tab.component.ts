import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AlertService, AuthenticationService } from 'src/app/servicio';
import { Servicio } from 'src/app/servicio/servicio';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-four-tab',
  templateUrl: './four-tab.component.html',
  styleUrls: ['./four-tab.component.css']
}) 
export class FourTabComponent implements OnInit {
  months: { value: number; label: string }[] = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' },
  ];
  years: number[] = [];
  selectedMonth: number; // Declarada aquí
  selectedYear: number; // Declarada aquí
  data: Membresia[] = [];
  filteredData: Membresia[] = [];
  displayedColumns: string[] = ['fechaIngreso', 'horaIngreso', 'tipoMembresia'];
  nombreCliente: string = "";

  constructor(
    private _snackBar: MatSnackBar,
    private loadingBar: LoadingBarService,
    private authenticationService: AuthenticationService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private servicio: Servicio,
    public formbuilder: FormBuilder,
    private activatedroute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.selectedMonth = new Date().getMonth() + 1; // Mes actual
    this.selectedYear = new Date().getFullYear(); // Año actual
  }

  ngOnInit(): void {
    const usuario: any = this.authenticationService.currentUserValue;
    const token = usuario['Token'].toString();
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 6 }, (_, i) => currentYear - 4 + i);
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id') != null) {
        this.ngxUiLoaderService.start();
        this.servicio
          .enviar_seguro(
            'Membresias/traerAsistencias',
            { id: params.get('id') },
            token
          )
          .subscribe(
            (response: any) => {
              //this.months = response.months;
              //this.years = response.years;
              this.data = response.data;
              this.nombreCliente = response.cliente.cliente_nombres;

              // Seleccionar el último año y mes en base a los datos recibidos
              const lastDate = this.getLastDate(); 
              console.log('Última fecha calculada:', lastDate);

              if (lastDate) {
                this.selectedYear = lastDate.year;
                this.selectedMonth = lastDate.month;
              } else {
                console.warn('No se encontró una última fecha válida. Usando valores por defecto.');
                //this.selectedYear = new Date().getFullYear();
                //this.selectedMonth = new Date().getMonth() + 1;
              } 
              this.cdr.detectChanges();
              console.log('Año seleccionado:', this.selectedYear);
              console.log('Mes seleccionado:', this.selectedMonth);

              // Actualizar los datos filtrados
              this.filterData();
              this.ngxUiLoaderService.stop();
            },
            (error) => {
              this.ngxUiLoaderService.stop();
              console.error('Error al cargar los datos:', error);
            }
          );
      }
    });
  }

  getLastDate(): { year: number; month: number } {
    if (this.data.length > 0) {
      const lastItem = this.data.reduce((a, b) => {
        const dateA = new Date(a.fechaIngreso);
        const dateB = new Date(b.fechaIngreso);
        return dateA > dateB ? a : b;
      });
      const lastDate = new Date(lastItem.fechaIngreso);
      return { year: lastDate.getFullYear(), month: lastDate.getMonth() + 1 };
    } else {
      const currentDate = new Date();
      return { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1 };
    }
  }

  onSelectionChange(): void {
    this.filterData();
  }

  filterData(): void {
    this.filteredData = this.data.filter((item) => {
      // Extraer año y mes de `fechaIngreso`
      const [year, month] = item.fechaIngreso.split('-').map(Number);
      // Comparar con `selectedYear` y `selectedMonth`
      return year == this.selectedYear && month == this.selectedMonth;
    });
  
    // Debug: Verificar los datos filtrados
    console.log('Datos filtrados:', this.filteredData);
  }
}

interface Membresia {
  fechaIngreso: string;
  horaIngreso: string;
  tipoMembresia: string;
}