import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'angular-highcharts';
import * as moment from 'moment';
import { Select2Data } from 'ng-select2-component';
 
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationService } from 'src/app/servicio';
import { Servicio } from 'src/app/servicio/servicio';
@Component({
  selector: 'app-reporte-empleado',
  templateUrl: './reporte-empleado.component.html',
  styleUrls: ['./reporte-empleado.component.css']
})
export class ReporteEmpleadoComponent implements OnInit {
   data: Select2Data = [
    {
        value: 'heliotrope',
        label: 'Heliotrope',
        data: { color: 'white', name: 'Heliotrope' },
    },
    {
        value: 'hibiscus',
        label: 'Hibiscus',
        data: { color: 'red', name: 'Hibiscus' },
    },
];
update(event:any){

}
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
    
  

  }
 
  datesUpdated(event:any){

  }
  mostrar(datos:any)
  {
   this.chart.destroy();
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
  });
  }

  chart = new Chart({
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
  });
  //HeatmapObject: Highcharts.Chart = null;
  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
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
