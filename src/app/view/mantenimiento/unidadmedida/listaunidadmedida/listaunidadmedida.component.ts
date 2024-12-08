import { Component, ViewChild,OnInit } from '@angular/core';
import { SimpleNotificationsComponent } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
import { MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import{MatPaginator} from '@angular/material/paginator';

import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/servicio';
import { Servicio } from 'src/app/servicio/servicio';
@Component({
  selector: 'app-listaunidadmedida',
  templateUrl: './listaunidadmedida.component.html',
  styleUrls: ['./listaunidadmedida.component.css']
})
export class ListaunidadmedidaComponent implements OnInit {


  constructor( private route: ActivatedRoute,
    private router: Router,
  private authenticationService: AuthenticationService,public servicio:Servicio) { }

  ngOnInit(): void {

    let _this=this;
    let usuario:any =  this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
   const token = usuario['Token'].toString();
  this.servicio.enviar_seguro('Web_service/lista_unidad_medida',  {}  , token).pipe().subscribe(
    (data:any)  =>  {

      _this.dataSource = new MatTableDataSource(data["lista"]);
    
});
  }

  
columnas = ['descripcion','sunat'];
nombrecolumna=[
  'Descripción ','Codigo Sunat'
]
  dataSource: MatTableDataSource<any>=new MatTableDataSource();

}
