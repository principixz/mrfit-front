import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { Chart } from 'angular-highcharts';
import * as moment from 'moment';
 
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationService } from 'src/app/servicio';
import { Servicio } from 'src/app/servicio/servicio';
moment.locale('es')
@Component({
  selector: 'app-reporte-venta',
  templateUrl: './reporte-venta.component.html',
  styleUrls: ['./reporte-venta.component.css']
})
export class ReporteVentaComponent implements OnInit {
  selected={start:moment(), end:moment()};

  public formulario!: FormGroup;
  public estado = false;
  option:any ={
    format: 'MM/DD/YYYY'
  };
  ranges: any = {
    'Hoy': [moment(), moment()],
    'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Esta semana': [moment().subtract(6, 'days'), moment()],
    "Semana pasada":[moment().subtract(1,"weeks").startOf("isoWeek"),
    moment().subtract(1,"weeks").endOf("isoWeek")],
    'Este mes': [moment().startOf("month"),moment().endOf("month")],"Mes pasado":[moment().subtract(1,"month").startOf("month"),moment().subtract(1,"month").endOf("month")],

    'Este año': [moment().startOf("years"),moment().endOf("years") 
  ]
  }
  valor="";
  event_seleccion(event:any)
  {
    
    let _this=this;
    let datefin=event.dates[1].format('YYYY-MM-DD');
    let dateini=event.dates[0].format('YYYY-MM-DD');
    console.log("range:");
    console.log(event);
    _this.valor=event.label;
    if(event.label=="Hoy")
    {
      
      let request:any={};
      request["fecha_inicio"]=dateini;
      request["fecha_fin"]=datefin;
     this.ngxUiLoaderService.start();
     let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
       let _this=this;
      this.conexion.enviar_seguro("web_service/venta_dia",request,token).pipe().subscribe(
       response=>{
          console.log(response);
          _this.mostrar(response);
          this.ngxUiLoaderService.stop();
          _this.valor="";
       },error=>{

       });

    }
    if(event.label=="Ayer")
    {
      let request:any={};
      request["fecha_inicio"]=dateini;
      request["fecha_fin"]=datefin;
     this.ngxUiLoaderService.start();
     let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
       let _this=this;
      this.conexion.enviar_seguro("web_service/venta_dia",request,token).pipe().subscribe(
       response=>{
          console.log(response);
          _this.mostrar(response);
          this.ngxUiLoaderService.stop();
          _this.valor="";
       },error=>{

       });
    }
    if(event.label=="Esta semana")
    {
      let request:any={};
      request["fecha_inicio"]=dateini;
      request["fecha_fin"]=datefin;
     this.ngxUiLoaderService.start();
     let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
       let _this=this;
      this.conexion.enviar_seguro("web_service/venta_semana",request,token).pipe().subscribe(
       response=>{
          console.log(response);
          _this.mostrar(response);
          this.ngxUiLoaderService.stop();
          _this.valor="";
       },error=>{

       });
    }
    if(event.label=="Semana pasada")
    {
      let request:any={};
      request["fecha_inicio"]=dateini;
      request["fecha_fin"]=datefin;
     this.ngxUiLoaderService.start();
     let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
       let _this=this;
      this.conexion.enviar_seguro("web_service/venta_semana",request,token).pipe().subscribe(
       response=>{
          console.log(response);
          _this.mostrar(response);
          this.ngxUiLoaderService.stop();
          _this.valor="";
       },error=>{

       });
    }
    if(event.label=="Este mes")
    {
      let request:any={};
      request["fecha_inicio"]=dateini;
      request["fecha_fin"]=datefin;
     this.ngxUiLoaderService.start();
     let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
       let _this=this;
      this.conexion.enviar_seguro("web_service/venta_mes",request,token).pipe().subscribe(
       response=>{
          console.log(response);
          _this.mostrar(response);
          this.ngxUiLoaderService.stop();
          _this.valor="";
       },error=>{

       });
    }
    if(event.label=="Mes pasado")
    {
      let request:any={};
      request["fecha_inicio"]=dateini;
      request["fecha_fin"]=datefin;
     this.ngxUiLoaderService.start();
     let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
       let _this=this;
      this.conexion.enviar_seguro("web_service/venta_mes",request,token).pipe().subscribe(
       response=>{
          console.log(response);
          _this.mostrar(response);
          this.ngxUiLoaderService.stop();
          _this.valor="";
       },error=>{

       });
    }
    if(event.label=="Este año")
    {
      let request:any={};
      request["fecha_inicio"]=dateini;
      request["fecha_fin"]=datefin;
     this.ngxUiLoaderService.start();
     let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
       let _this=this;
      this.conexion.enviar_seguro("web_service/venta_anio",request,token).pipe().subscribe(
       response=>{
          console.log(response);
          _this.mostrar(response);
          this.ngxUiLoaderService.stop();
          _this.valor="";
       },error=>{

       });
    }

  }
 
  datesUpdated(event:any){
    if(this.valor=="")
    {

      let datefin=event.endDate;
      let dateini=event.startDate;
      let request:any={};
      request["fecha_inicio"]=dateini.format('YYYY-MM-DD') ;
      request["fecha_fin"]=datefin.format('YYYY-MM-DD') ;
     this.ngxUiLoaderService.start();
     let usuario: any = this.authenticationService.currentUserValue;
     console.log(usuario['Token']);
     const token = usuario['Token'].toString();
       let _this=this;
    
       this.conexion.enviar_seguro("web_service/venta_mes",request,token).pipe().subscribe(
        response=>{
           console.log(response);
           _this.mostrar(response);
           this.ngxUiLoaderService.stop();
           _this.valor="";
 
        },error=>{
 
        });
    /*  let token=user["Token"];
       let _this=this;
    
       this.conexion.enviar_seguro("Reporte_venta/venta_mes",request,token).pipe().subscribe(
        response=>{
           console.log(response);
           _this.mostrar(response);
           this.ngxUiLoaderService.stop();
           _this.valor="";
 
        },error=>{
 
        });*/
      //console.log("update:");
      //console.log(event);
    //  alert();
    }
   
 /// this.cargar_reporte(event);

  }
  mostrar(datos:any){
 /*  this.chart.destroy();
   this.chart= new Chart({
    chart: {
      
      type: 'line',
  
      height: 400,
  },
  title: {
      text: 'Detalle de Ventas'
  },
  subtitle: {
      text: ''
  },
  xAxis: {
      categories:  datos["extension"]
  },
  yAxis: {
      title: {
          text: 'Soles (S/.)'
      }
  },
  credits: {
    enabled: false
  },
  plotOptions: {
      line: {
          dataLabels: {
              enabled: true
          },
          enableMouseTracking: false
      }
  },
    series: [
      {
    
        name:  datos["cronologia"],
        data: datos["monto"],
        type:'line'
      }
    ]
  }); */
  }

  /*chart = new Chart({
    chart: {
      
      type: 'line',
     
      height: 400,
  },
  title: {
      text: 'Detalle de Ventas'
  },
  subtitle: {
      text: ''
  },
  xAxis: {
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  },
  yAxis: {
      title: {
          text: 'Soles (S/.)'
      }
  },
  credits: {
    enabled: false
  },
  plotOptions: {
      line: {
          dataLabels: {
              enabled: true
          },
          enableMouseTracking: false
      }
  },
    series: [
      {
        name: 'Dias',
        data: [0,0,0,0,0,0,0,0,0,0,0,0],
        type:'line'
      }
    ]
  });*/
  //HeatmapObject: Highcharts.Chart = null;
  add() {
    //this.chart.addPoint(Math.floor(Math.random() * 10));
  }
  public  hoydia!: string;
  constructor(public toastr: ToastrService, public ngxUiLoaderService: NgxUiLoaderService, 
    // tslint:disable-next-line: variable-name
    public _formBuilder: FormBuilder, public conexion: Servicio,
    public authenticationService: AuthenticationService,
    public route: ActivatedRoute,
    public router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.hoydia = new Date().toISOString().split('T')[0]; 
    this.formulario = this._formBuilder.group({
    
      desde: [this.hoydia, ''],
      // tslint:disable-next-line: object-literal-sort-keys
      hasta: [this.hoydia, ''],
     
    });
  }

}
