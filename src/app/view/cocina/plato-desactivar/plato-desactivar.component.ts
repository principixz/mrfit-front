import { Component, OnInit ,ViewChild} from '@angular/core';
import{Servicio} from '../../../servicio/servicio';
import { AlertService, AuthenticationService } from '../../../servicio';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { es } from 'date-fns/locale';
import { formatDistanceToNow,formatDistanceToNowStrict } from 'date-fns';
import {MatMenuTrigger} from '@angular/material/menu';
import {  Directive,ElementRef,EventEmitter,OnDestroy,Output} from "@angular/core";
import {fromEvent,merge,of,Subscription,timer} from "rxjs";
import {filter,map,switchMap} from "rxjs/operators";
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

export class Plato {
  id: string;
  nombre: string;
estado:boolean;

  constructor(id:string,nombre:string,estado:boolean){
      this.id=id;
      this.nombre=nombre;
      this.estado=estado;
    
  }
}
@Component({
  selector: 'app-plato-desactivar',
  templateUrl: './plato-desactivar.component.html',
  styleUrls: ['./plato-desactivar.component.css']
})
export class PlatoDesactivarComponent implements OnInit {
  btnlimpiar=false;
  url_global:string=this.servicio.url_global;
  @ViewChild('button') button!: ElementRef;
  constructor(private _snackBar: MatSnackBar,private route: ActivatedRoute,
    private router: Router,
  private authenticationService: AuthenticationService,public servicio:Servicio) { }

  ngOnInit(): void {
    this.cargar_info();
  }
  validar(event: any)
{
console.log(event.target.value);
if(event.target.value!=''){
  this.btnlimpiar=true;
}else{
  this.btnlimpiar=false;
}
}
searchText='';
limpiar(){
  this.searchText='';
  this.btnlimpiar=false;
}
platos:Plato[]=[];
cambiar(event:any,index:any,id_:Number)

{
 let estado=event.checked;
 //alert(id_);
 //let id=this.platos[index].id;

 let _this=this;
  let usuario:any =  this.authenticationService.currentUserValue;
  console.log(usuario['Token']);
 const token = usuario['Token'].toString();
this.servicio.enviar_seguro('Web_service/ws_habilitar_prender_producto',  {"id":id_,"estado":estado}  , token,2).pipe().subscribe(
  (data:any)  =>  {
     this._snackBar.open(data["mensaje"], 'LISTO',{
      duration: 4 * 1000,
    });

    });

}
cargar_info()
{

  let _this=this;
  let usuario:any =  this.authenticationService.currentUserValue;
  console.log(usuario['Token']);
 const token = usuario['Token'].toString();
this.servicio.enviar_seguro('Web_service/ws_cargar_platos',  {}  , token,2).pipe().subscribe(
  (data:any)  =>  {
      console.log(data);
      data.forEach((val:any)=>{
        let pla=new Plato(val["producto_id"],val["producto_descripcion"],Boolean(parseInt(val["producto_encendido"])));
        _this.platos.push(pla );
      })

    });

   console.log(_this.platos);

  
}

}
