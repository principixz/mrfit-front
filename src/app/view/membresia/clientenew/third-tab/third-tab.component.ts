import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationService } from 'src/app/servicio';
import { Servicio } from 'src/app/servicio/servicio';

@Component({
  selector: 'app-third-tab',
  templateUrl: './third-tab.component.html',
  styleUrls: ['./third-tab.component.css']
})
export class ThirdTabComponent implements OnInit {
  displayedColumns: string[] = [
    'campo_modificado',
    'detalles',
    'accion',
    'empleado_nombre',
    'empleado_apellido',
    'fecha'
  ];

  // Define el tipo específico para los datos
  

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private ngxUiLoaderService: NgxUiLoaderService,
    private servicio: Servicio
  ) {}

  dataSource: MatTableDataSource<LogTransaccion> = new MatTableDataSource<LogTransaccion>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    const usuario: any = this.authenticationService.currentUserValue;
    const token = usuario['Token'].toString();

    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id') != null) {
        const clienteId = params.get('id');
        this.ngxUiLoaderService.start();
        this.servicio
          .enviar_seguro(
            'Membresias/obtenerLogTransacciones',
            { cliente_id: clienteId },
            token
          )
          .subscribe(
            (response: any) => {
              if (response.estado) {
                // Asignar los datos obtenidos al dataSource
                //this.dataSource = new MatTableDataSource<LogTransaccion>(response.data);
                this.dataSource.data = response.data || []; 
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              } else {
                console.error('Error en la respuesta del servidor:', response.mensaje);
              }
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

   // Método para filtrar los datos
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Si estás usando paginación, resetea la página al filtrar
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getActionClass(action: string): string {
    switch (action) {
      case 'INSERT':
        return 'action-insert';
      case 'UPDATE':
        return 'action-update';
      case 'DELETE':
        return 'action-delete';
      default:
        return '';
    }
  }
}

interface LogTransaccion {
  campo_modificado: string;
  detalles: string;
  accion: string;
  empleado_nombre: string;
  empleado_apellido: string;
  fecha: Date;
}