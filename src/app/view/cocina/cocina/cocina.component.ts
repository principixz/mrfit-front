import { Component, OnInit, OnDestroy } from '@angular/core';
import { Servicio } from '../../../servicio/servicio';
import { AlertService, AuthenticationService } from '../../../servicio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { es } from 'date-fns/locale';
import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
interface Area {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.css']
})
export class CocinaComponent implements OnInit {
  selectedValue: string;
  dateOne = new Date(2016, 0, 1);
  options = {
    locale: es,
    addSuffix: true,
    includeSeconds: true
  };
  areas: Area[] = [
    { value: '1', viewValue: 'Cocina' },

  ];
  lista_mesa: any[] = [];
  constructor(private _snackBar: MatSnackBar, private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService, public servicio: Servicio) {
    this.selectedValue = '1';
  }
  time: any;
  ngOnInit(): void {
    this.cargar_cocina();
    let _this = this;
    this.time = setInterval(function () { _this.cargar_cocina(); }, 3000);
  }
  ngOnDestroy(): void {
    clearInterval(this.time);
  }
  sonido() {
    let audio = new Audio("'../../../../assets/timbre_recepcion.mp3");
    audio.load();
    audio.play();
  }
  hora: Date[] = [
  ];
  tam = 0;
  sec: string[] = [];
  cargar_cocina() {
    let _this = this;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    this.servicio.enviar_seguro('web_service/ws_mostrar_cocina', {}, token, 2).pipe().subscribe(
      (data: any) => {
        let temp = _this.tam;
        _this.tam = data.length;
        console.log(_this.tam);
        _this.sec = [];
        _this.hora = [];
        _this.lista_mesa = data;
        _this.lista_mesa.forEach(element => {
          _this.hora.push(new Date(element["venta_pedidofecha"]));
          let info = formatDistanceToNowStrict(new Date(element["venta_pedidofecha"]), {
            roundingMethod: "round",
            locale: es,
            addSuffix: false,
            unit: "minute"
          });
          if (_this.tam != 0 && _this.tam > temp) {
            _this.sonido();

          }
          //  
          let inf = info.split(" ");
          let datos = inf[0];
          let ifpp = inf[1];
          _this.sec.push(datos + " " + ifpp[0]);
        });
        //  _this.dataSource = new MatTableDataSource(data["lista_concepto"]);
      });
  }

  aceptar_pedido(index1: number, venta_id: number) {
    this.lista_mesa = this.lista_mesa.filter(((item) => item.venta_idventas != venta_id));
    this.sec = this.sec.filter(((item, index) => index != index1));
    this.hora = this.hora.filter(((item, index) => index != index1));
    let _this = this;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    this.servicio.enviar_seguro('web_service/actividad_venta', { 'id': venta_id }, token, 2).pipe().subscribe(
      (data: any) => {
        let snackBarRef = this._snackBar.open(data["mensaje"], 'DESHACER', {
          duration: 4 * 1000,
        });
        snackBarRef.onAction().subscribe(() => {
  
          _this.servicio.enviar_seguro('web_service/deshacer_preparar', { 'id': venta_id }, token, 2).pipe().subscribe(
            (data: any) => {
            });
        });
      }, (error) => {
      });
  }
}
