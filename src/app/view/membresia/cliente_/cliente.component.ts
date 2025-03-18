import { Component, ViewChild, OnInit } from '@angular/core';
import { SimpleNotificationsComponent } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Servicio } from '../../../servicio/servicio';
import { AlertService, AuthenticationService } from '../../../servicio';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  columnas = [
    'cliente_dni',
    'cliente_nombres',
    'tipo_membresia_nombre',
    'cliente_telefono',
    'fecha_vencimiento',
    'estado_opcion',
  ];
  nombrecolumna = [
    'DNI',
    'Nombres',
    'Membresía',
    'Teléfono',
    'Fecha Vencimiento',
    'Estado Opción',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public servicio: Servicio
  ) {}

  ngOnInit() {
    let _this = this;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    this.servicio
      .enviar_seguro('web_service/ws_cliente_lista', {}, token)
      .pipe()
      .subscribe((data: any) => {
        _this.dataSource = new MatTableDataSource(data['tabla']);
        _this.dataSource.paginator = _this.paginator;
        _this.dataSource.sort = _this.sort;
      });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}