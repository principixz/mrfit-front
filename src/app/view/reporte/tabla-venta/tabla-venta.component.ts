import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationService } from '../../../servicio/authentication.service';
import { Servicio } from '../../../servicio/servicio';
import * as moment from 'moment';

import { DataTableDirective } from 'angular-datatables';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
moment.locale('es')

@Component({
  selector: 'app-tabla-venta',
  templateUrl: './tabla-venta.component.html',
  styleUrls: ['./tabla-venta.component.css']
})
export class TablaVentaComponent implements OnInit {
  selected = { start: moment(), end: moment() };
  public hoydia!: string;
  public formulario!: FormGroup;
  public estado = false;
  public estoadoanio = false;
  public urlglobal = 'Reporte/reportegeneral/';
  total = "S/ 0.00";
  @ViewChild(DataTableDirective, { static: false })
  public datatable!: DataTableDirective;
  public dtOptions: any = {};
  public dtTrigger: Subject<any> = new Subject();
  //public formulario = 
  public ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  event_seleccion(event: any) {
    console.log(event);
  }
  datesUpdated(event: any) {
    this.cargar_reporte(event);
  }
  lista_reporte: any = [];
  cargar_reporte(event: any) {
    console.log(event);
    if (event.startDate == null) {
      return;
    }
    let datefin = event.endDate;
    let dateini = event.startDate;
    let request: any = {};
    request["fecha_inicio"] = dateini.format('YYYY-MM-DD');
    request["fecha_fin"] = datefin.format('YYYY-MM-DD');
    request["tipo"]=this.formulario.get("seleccionar")?.value;
    this.ngxUiLoaderService.start();
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    let _this = this;
    this.conexion.enviar_seguro("Web_service/cargar_reporte_venta", request, token).pipe().subscribe(
      response => {
        console.log(response);
        _this.lista_reporte = response;
        let total_calculo = 0;
        _this.lista_reporte.forEach((element: any) => {
          //   console.log(element.monto);
          total_calculo += parseFloat(element.monto);
        });
        _this.total = "S/ " + total_calculo.toFixed(2);
        _this.datatable.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          _this.dtTrigger.next();
        });
        _this.ngxUiLoaderService.stop();
      },
      error => { }
    );
  }
  isCustomDate(date: any) {
    //this.cargar_reporte(date);
    //alert();
    /*return  (
      date.weekday() === 0 ||
      date.weekday() === 6
    )  ? 'mycustomdate' : false;*/
  }
  ranges: any = {
    'Hoy': [moment(), moment()],
    'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Esta semana': [moment().subtract(6, 'days'), moment()],
    "Semana pasada": [moment().subtract(1, "weeks").startOf("isoWeek"),
    moment().subtract(1, "weeks").endOf("isoWeek")],
    'Este mes': [moment().startOf("month"), moment().endOf("month")], "Mes pasado": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],

    'Este año': [moment().startOf("years"), moment().endOf("years")
    ]
  }
  option: any = {
    format: 'MM/DD/YYYY'
  };
  constructor(public toastr: ToastrService, public ngxUiLoaderService: NgxUiLoaderService,
    // tslint:disable-next-line: variable-name
    public _formBuilder: FormBuilder, public conexion: Servicio,
    public authenticationService: AuthenticationService,
    public route: ActivatedRoute,
    public router: Router, private modalService: NgbModal) { }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngOnInit(): void {
    this.hoydia = new Date().toISOString().split('T')[0];
    this.formulario = this._formBuilder.group({
      anios: [0, Validators.pattern('^[0-9]*$')],
      desde: [this.hoydia, ''],
      // tslint:disable-next-line: object-literal-sort-keys
      hasta: [this.hoydia, ''],
      tiporeporte: [1, ''],
    });
    this.formulario = new FormGroup({
      desde: new FormControl(''),
      seleccionar: new FormControl('1'),
    });
    this.dtOptions = {
      language: {
        processing: 'Procesando...',
        search: 'Buscar:',
        // tslint:disable-next-line: object-literal-sort-keys
        lengthMenu: 'Mostrar _MENU_ elementos',
        info: 'Mostrando desde _START_ al _END_ de _TOTAL_ elementos',
        infoEmpty: 'Mostrando ningún elemento.',
        infoFiltered: '(filtrado _MAX_ elementos total)',
        infoPostFix: '',
        loadingRecords: 'Cargando registros...',
        zeroRecords: 'No se encontraron registros',
        emptyTable: 'No hay datos disponibles en la tabla',
        paginate: {
          first: 'Primero',
          previous: 'Anterior',
          // tslint:disable-next-line: object-literal-sort-keys
          next: 'Siguiente',
          last: 'Último',
        },
        aria: {
          sortAscending: ': Activar para ordenar la tabla en orden ascendente',
          sortDescending: ': Activar para ordenar la tabla en orden descendente',
        },
      },
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      buttons: [
        'excel',
      ]
      // Configure the buttons
    };
  }
  public generarpdf() {
    const desde = this.formulario.value.desde;
    const hasta = this.formulario.value.hasta;
    const anios = this.formulario.value.anios;
    window.open(this.conexion.url_global + this.urlglobal + desde + '/' + hasta + '/' + anios);
    return false;
  }

}
