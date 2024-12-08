
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
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

   
  constructor(     private route: ActivatedRoute,
    private router: Router,
  private authenticationService: AuthenticationService,public servicio:Servicio) { 

    const users: any[] = [];
    var users1=[];
    for (let i = 1; i <= 100; i++) { /*users.push(createNewUser(i));*/
    
      users1.push({"cnt" : i,"name":"batr"+i});
      
     }

    // Assign the data to the data source for the table to render
   
  }



  ngOnInit(){
  let _this=this;
    let usuario:any =  this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
   const token = usuario['Token'].toString();
  this.servicio.enviar_seguro('Web_Service/ws_cliente_lista',  {}  , token).pipe().subscribe(
    (data:any)  =>  {

      _this.dataSource = new MatTableDataSource(data["tabla"]);
    
});
    
  //this._service.success('nat','dndnnd',this.options);
}

columnas = [
'cliente_dni','cliente_nombres','cliente_telefono','fechaFinMembresia','cliente_email',
];
nombrecolumna=[
  'DNI','Nombres','Telefono','Fecha Vencimiento','Correo'
]
  dataSource: MatTableDataSource<any>=new MatTableDataSource();


}
