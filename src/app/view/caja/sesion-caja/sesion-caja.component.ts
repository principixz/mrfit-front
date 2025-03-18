import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import{Servicio} from '../../../servicio/servicio';
import { AlertService, AuthenticationService } from '../../../servicio';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { Chart } from 'angular-highcharts';
import {NgbModal, ModalDismissReasons, NgbActiveModal,} from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-sesion-caja',
  templateUrl: './sesion-caja.component.html',
  styleUrls: ['./sesion-caja.component.css']
})
export class SesionCajaComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options={} ;

  closeResult = '';


  openDialog() {
    this.dialog.open(NgbdModalContent2,{
      maxWidth: "600px",
   
    });
  }

  cerrar_sesion(){
    let _this=this;
    //   this.modalService.open(NgbdModalContent, { size: 'md' }); 
    const modalRef =this.modalService.open(NgbdModalContent1, {ariaLabelledBy: 'modal-basic-title',size: 'md'} );

    modalRef.result.then((result:any) => {
      // console.log(receivedEntry);
      //alert();
      if(result){
       _this.cargar_inicial();
     }
       });
  }
  open() {
    let _this=this;
 //   this.modalService.open(NgbdModalContent, { size: 'md' }); 
 const modalRef =this.modalService.open(NgbdModalContent, {backdrop:'static',keyboard:false,ariaLabelledBy: 'modal-basic-title',size: 'md'} );

 //_this.saldoinicialf=parseFloat(data["saldoinicialf"]);
    //  _this.saldoinicialv=parseFloat(data["saldoinicialv"]);
 modalRef.componentInstance.name = {"ingresosf":_this.saldoinicialf,"ingresosv": _this.saldoinicialv};
 modalRef.result.then((result:any) => {
  // console.log(receivedEntry);
  //alert();
  if(result){
   _this.cargar_inicial();
 }
   });
   /*.componentInstance.data({"ingresosf":_this.cajaingf,"ingresosv": _this.cajaingv}).result.
 then((result:any) => {
      //this.closeResult = `Closed with: ${result}`;
      if(result){
        _this.cargar_inicial();
      }
    });
    /* _this.cajaingf=parseFloat(data["ingresosf"]);
      _this.cajaingv=parseFloat(data["ingresosv"]);
    
    modalRef.componentInstance.data = {"ingresosf":_this.cajaingf,"ingresosv": _this.cajaingv};
  modalRef.componentInstance.passEntry.subscribe((result:any) => {
     // console.log(receivedEntry);
     if(result){
      _this.cargar_inicial();
    }
      });*/


  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  constructor( public dialog: MatDialog,private modalService: NgbModal, private router: Router,
    private authenticationService: AuthenticationService,public servicio:Servicio) { }
    chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Reporte de Caja Fisica del día'
      },
      credits: {
        enabled: false
      },
      series: [
        {
         
        }
      ]
    } as any);
    chart1 = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Reporte de Caja Virtual del día'
      },
      credits: {
        enabled: false
      },
      series: [
        {
         
        }
      ]
    } as any);

    cajafisica=0;
    cajavirtual=0;
    fecha_actual="";
    mov_f="0";
    mov_v="0";
    cajaingf=0;
    cajaingv=0;
    cajaegrf=0;
    cajaegrv=0;
    estadosesioncaja=-1;
    estado_caja=0;
    pagos_mov=[];
    total=0;
    saldoinicialf=0;
    saldoinicialv=0;

  ngOnInit(): void {
   this.cargar_inicial();
  }
  cargar_inicial()
  {
    let _this=this;
    let usuario:any =  this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
   const token = usuario['Token'].toString();
  this.servicio.enviar_seguro('web_service/ws_informacion_caja',  {}  , token,2).pipe().subscribe(
    (data:any)  =>  {
      _this.cargar_caja_fisica(data["caja2"],data["caja1"]);
      _this.fecha_actual=data["fecha_dia"];
      _this.mov_f=data["movif"];
      _this.mov_v=data["moviv"]; 
      _this.estadosesioncaja=parseInt(data["estadosesioncaja"]);
      _this.estado_caja=parseInt(data["estado_caja"]);
      _this.pagos_mov=data["array_formapago"];
      _this.cajaingf=parseFloat(data["ingresosf"]);
      _this.cajaingv=parseFloat(data["ingresosv"]);
      _this.cajaegrf=parseFloat(data["egresosf"]);
      _this.cajaegrv=parseFloat(data["egresosv"]);

      _this.saldoinicialf=parseFloat(data["saldoinicialf"]);
      _this.saldoinicialv=parseFloat(data["saldoinicialv"]);
      _this.cajafisica= (_this.saldoinicialf + _this.cajaingf) - _this.cajaegrf;
      _this.cajavirtual=( _this.saldoinicialv + _this.cajaingv) - _this.cajaegrv;
      _this.pagos_mov.forEach(element => {
        _this.total+=parseFloat(element["total"]);
      });
    });

  }

  cargar_caja_fisica(id_caja_fisica:any,id_caja_virtaul:any){

    let _this=this;
    let usuario:any =  this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
   const token = usuario['Token'].toString();
   let request:any={};
   request["cajafisica"]=id_caja_fisica;
   request["cajavirtual"]=id_caja_virtaul;
     //alert(id_caja_virtaul);
  this.servicio.enviar_seguro('web_service/ws_sesion_traerfisica',  request  , token).pipe().subscribe(
    (data:any)  =>  {
      console.log(data)
      _this.chart = new Chart({
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Reporte de Caja Fisica del día'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                minute: '%H:%M',
                hour: '%H:%M',
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Soles (S/.)'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b %H:%M}: S/. {point.y:.2f}'
        },
    
        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },
    
        colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
    
        // Define the data points. All series have a dummy year
        // of 1970/71 in order to be compared on the same x axis. Note
        // that in JavaScript, months start at 0 for January, 1 for February etc.
        series: [
          data["data"]["compras"]
        , 
        data["data"]["ventas"]
        ]
    } as  any);
         
    });
    request["cajafisica"]=id_caja_fisica;
    request["cajavirtual"]=id_caja_virtaul;
      //alert(id_caja_virtaul);
   this.servicio.enviar_seguro('web_service/ws_sesion_traervirtual',  request  , token).pipe().subscribe(
     (data:any)  =>  {
       console.log(data)
       _this.chart1 = new Chart({
         chart: {
             type: 'spline'
         },
         title: {
             text: 'Reporte de Caja Virtual del día'
         },
         subtitle: {
             text: ''
         },
         xAxis: {
             type: 'datetime',
             dateTimeLabelFormats: { // don't display the dummy year
                 minute: '%H:%M',
                 hour: '%H:%M',
                 month: '%e. %b',
                 year: '%b'
             },
             title: {
                 text: 'Date'
             }
         },
         yAxis: {
             title: {
                 text: 'Soles (S/.)'
             },
             min: 0
         },
         tooltip: {
             headerFormat: '<b>{series.name}</b><br>',
             pointFormat: '{point.x:%e. %b %H:%M}: S/. {point.y:.2f}'
         },
     
         plotOptions: {
             spline: {
                 marker: {
                     enabled: true
                 }
             }
         },
     
         colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
     
         // Define the data points. All series have a dummy year
         // of 1970/71 in order to be compared on the same x axis. Note
         // that in JavaScript, months start at 0 for January, 1 for February etc.
         series: [
           data["data"]["compras"]
         , 
         data["data"]["ventas"]
         ]
     } as  any);
          
     });     
  }


}

@Component({
  selector: 'app-sesion-caja1',
  templateUrl: './modal-sesion.component.html',

})
export class NgbdModalContent implements OnInit  {
  @Input() name: any;
  button_disabled=false;
  button_descripcion=" Si, Cerrar caja ahora";

  constructor( private _snackBar: MatSnackBar,   private authenticationService: AuthenticationService,public servicio:Servicio,public activeModal: NgbActiveModal,public modal: NgbActiveModal) {
    
  }
  info:any;
  ngOnInit(): void {
    console.log(this.name);   
    this.info=this.name;
  }



  procesar_cierre(){
    //alert();
    let _this=this;
    _this.button_disabled=true;
    _this.button_descripcion="Procesando...";
    let usuario:any =  this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
   const token = usuario['Token'].toString();
   let request:any={};


   request["ingresosf"]=parseFloat(_this.info["ingresosf"]);
   request["ingresosv"]=parseFloat(_this.info["ingresosv"]);
  this.servicio.enviar_seguro('web_service/ws_cerrar_sesion_caja',  request , token,2).pipe().subscribe(
    (data:any)  =>  {
      if(data["estado"]){
        this._snackBar.open("Se cerro correctamente caja",'',{duration: 1 * 1000,});
        _this.button_disabled=false;
        _this.button_descripcion=" Si, Cerrar caja ahora";
        _this.modal.close(true);
      }

    });
  }
}



@Component({
  selector: 'app-sesion-caja2',
  templateUrl: './modal-sesionabrir.component.html',

})
export class NgbdModalContent1 implements OnInit  {
  @Input() name: any;
  button_disabled=false;
  button_descripcion="Abrir caja";


  form = new FormGroup({
    inicio_caja: new FormArray([
      new FormControl('0'),
      new FormControl('0'),
    ]),
  });
  constructor(  private _snackBar: MatSnackBar,  private authenticationService: AuthenticationService,public servicio:Servicio,public activeModal: NgbActiveModal,public modal: NgbActiveModal) {
    
  }
  ngOnInit(): void {
   // throw new Error('Method not implemented.');
  }
  
  onSubmit() {
   // console.log(this.cities.value);  // ['SF', 'NY']
    console.log(this.form.value);    // { cities: ['SF', 'NY'] }


    let _this=this;
    _this.button_disabled=true;
    _this.button_descripcion="Procesando...";
    let usuario:any =  this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
   const token = usuario['Token'].toString();
   let request:any={};


  // request["ingresosf"]=parseFloat(_this.info["ingresosf"]);
   //request["ingresosv"]=parseFloat(_this.info["ingresosv"]);
  this.servicio.enviar_seguro('web_service/ws_cerrar_sesion_apertura_caja',  this.form.value , token,2).pipe().subscribe(
    (data:any)  =>  {
      if(data["estado"]){
        this._snackBar.open("Se abrio correctamente caja",'',{duration: 1 * 1000,});
        _this.button_disabled=false;
       // _this.button_descripcion=" Si, Cerrar caja ahora";
       _this.button_descripcion="Abrir caja";
        _this.modal.close(true);
      }

    });

  }



  

}

@Component({
  selector: 'app-sesion-caja3',
  templateUrl: './modal-arqueo.component.html',

})
export class NgbdModalContent2 implements OnInit  {
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  constructor(    public dialogRef: MatDialogRef<NgbdModalContent2>,public servicio:Servicio,private authenticationService: AuthenticationService) {
    
  }

   arqueo(){
    let usuario:any =  this.authenticationService.currentUserValue;
 //   console.log(usuario['Token']);
   const token = usuario['Token'].toString();
    window.open(this.servicio.url_global+"Sesion_caja/cargar_detalle_pagos_nuevo/"+token);
    this.dialogRef.close();
    return 0;
  }

  arqueo1(){
    let usuario:any =  this.authenticationService.currentUserValue;
 //   console.log(usuario['Token']);
   const token = usuario['Token'].toString();
    window.open(this.servicio.url_global+"Sesion_caja/llamarfuncion_nuevo/1/"+token);
    this.dialogRef.close();
    return 0;
  }

  arqueo2(){
    let usuario:any =  this.authenticationService.currentUserValue;
 //   console.log(usuario['Token']);
   const token = usuario['Token'].toString();
    window.open(this.servicio.url_global+"Sesion_caja/llamarfuncion_nuevo/2/"+token);
    this.dialogRef.close();
    return 0;
  }
}

