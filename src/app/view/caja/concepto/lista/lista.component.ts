
import { Component, ViewChild,OnInit } from '@angular/core';
import { SimpleNotificationsComponent } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
import { MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import{MatPaginator} from '@angular/material/paginator';
import{Servicio} from '../../../../servicio/servicio';
import { AlertService, AuthenticationService } from '../../../../servicio';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

   
  constructor(     private route: ActivatedRoute,
    private router: Router,
  private authenticationService: AuthenticationService,public servicio:Servicio) { 
   
  }



  ngOnInit(){
  let _this=this;
    let usuario:any =  this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
   const token = usuario['Token'].toString();
  this.servicio.enviar_seguro('Web_service/lista_concepto',  {}  , token).pipe().subscribe(
    (data:any)  =>  {

      _this.dataSource = new MatTableDataSource(data["lista_concepto"]);
    
});
    
  //this._service.success('nat','dndnnd',this.options);
}

columnas = ['descripcion','descripcion_tipo'];
nombrecolumna=[
  'Descripción de concepto','Tipo de Movimientos',
]
  dataSource: MatTableDataSource<any>=new MatTableDataSource();


 
 
}
