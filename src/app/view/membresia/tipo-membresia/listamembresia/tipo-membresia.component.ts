import { Component, ViewChild,OnInit } from '@angular/core';
import { SimpleNotificationsComponent } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
import { MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import{MatPaginator} from '@angular/material/paginator';
import { Servicio } from 'src/app/servicio/servicio'; 
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/servicio';

@Component({
  selector: 'app-tipo-membresia',
  templateUrl: './tipo-membresia.component.html',
  styleUrls: ['./tipo-membresia.component.css']
})
export class TipoMembresiaComponent implements OnInit {
  constructor( private route: ActivatedRoute,private router: Router,
  private authenticationService: AuthenticationService,public servicio:Servicio) { }

  ngOnInit(): void {
    let _this=this;
    let usuario:any =  this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    this.servicio.enviar_seguro('Membresias/get_membresia ',  {}  , token).pipe().subscribe(
    (data:any)  =>  {
      _this.dataSource = new MatTableDataSource(data["tipomembresia"]);
    });
  }
  columnas = ['nombre_servicio','precio_servicio','categoria_membresia','tipo_pago','tipo_periodo','estado'];
  nombrecolumna=[
    'Descripción',
    'Precio',
    'Categoria Membresia',
    'Tipo Periodo Pago',
    'Fecha Tipo Periodo',
    'Estado'
  ]
  dataSource: MatTableDataSource<any>=new MatTableDataSource();
}
