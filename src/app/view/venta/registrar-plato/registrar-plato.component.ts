
import { Component, ViewChild,OnInit } from '@angular/core';
import { SimpleNotificationsComponent } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
import { MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import{MatPaginator} from '@angular/material/paginator';
import{Servicio} from '.././../../servicio/servicio';
import { AlertService, AuthenticationService } from '../../../servicio';
@Component({
  selector: 'app-registrar-plato',
  templateUrl: './registrar-plato.component.html',
  styleUrls: ['./registrar-plato.component.css']
})
export class RegistrarPlatoComponent implements OnInit {

  constructor(     private route: ActivatedRoute,
    private router: Router,
  private authenticationService: AuthenticationService,public servicio:Servicio) { 

   
  }



  ngOnInit(){
  let _this=this;
    let usuario:any =  this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
   const token = usuario['Token'].toString();
  this.servicio.enviar_seguro('web_service/cargar_platos_productos',  {}  , token).pipe().subscribe(
    (data:any)  =>  {

      _this.dataSource = new MatTableDataSource(data["tabla"]);
    
});
    
  //this._service.success('nat','dndnnd',this.options);
}

columnas = [
'producto_descripcion','producto_precio','categoria_producto_descripcion','producto_stock'
];
nombrecolumna=[
  'Descripcion','Precio','Categoria','Stock'
]
  dataSource: MatTableDataSource<any>=new MatTableDataSource();



}
