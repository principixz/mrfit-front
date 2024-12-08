import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Servicio } from '../../../servicio/servicio';
import { AlertService, AuthenticationService } from '../../../servicio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { es } from 'date-fns/locale';
import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
import { MatMenuTrigger } from '@angular/material/menu';
import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from "@angular/core";
import { fromEvent, merge, of, Subscription, timer } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {

  HostBinding,
  HostListener
} from '@angular/core';
import { ModalMesa } from 'src/app/modal/modalmesa/modalmesa.component';
interface Tipo {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  lista_opciones: Mesa[] = [

    {
      nombre: 'Cuenta',
      lista: [1],
      id: 1,
      lista_agrupada:[0,1]

    },
    {
      nombre: 'Unir',
      lista: [0, 1,2],
      id: 2,
      lista_agrupada:[0]

    },
    {
      nombre: 'Reservar',
      lista: [0,4],
      id: 3,
      lista_agrupada:[0,1]

    },
    {
      nombre: 'Anular agrupación',
      lista: [0,1,2],
      id: 4,
      lista_agrupada:[1]
    },
    {
      nombre: 'Anular reserva',
      lista: [2],
      id: 5,
      lista_agrupada:[0,1]

    },

  ];
  lista_opciones_tem: Mesa[] = [];
  selectedValue = "1";
  options = {
    locale: es,
    addSuffix: false,
    includeSeconds: true
  };
  tipo: Tipo[] = [
    { value: '1', viewValue: 'Todos' },
    { value: '2', viewValue: 'Libres' },
    { value: '3', viewValue: 'Ocupados' },
    { value: '4', viewValue: 'Reservados' },


  ];
  searchText: any = '';
  menuTopLeftPosition = { x: '0', y: '0' };
  @ViewChild(MatMenuTrigger, { static: true }) matMenuTrigger!: MatMenuTrigger;
  btnlimpiar = false;
  datos_seleccionado = {};
  onRightClick(event: MouseEvent, estado_mesa: any, venta_id: any, mesa_id: any,estado_agrupado:any) {

    let data: any = {};
    let _this = this;
    data["tipo_mesa"] = estado_mesa;
    data["venta_id"] = venta_id;
    data["mesa_id"] = mesa_id;
    data["estado_agrupado"]=estado_agrupado;
    // preventDefault avoids to show the visualization of the right-click menu of the browser 
    event.preventDefault();
    this.datos_seleccionado = data;

    // we record the mouse position in our object 
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';
    console.log(estado_mesa);
    console.log(estado_agrupado);
    this.lista_opciones = this.lista_opciones_tem.filter(x => x.lista.includes(parseInt(estado_mesa)) &&  x.lista_agrupada.includes(parseInt(estado_agrupado)));
    console.log(this.lista_opciones);
    // we open the menu 
    // we pass to the menu the information about our object 
    this.matMenuTrigger.menuData = []

    // we open the menu 
    this.matMenuTrigger.openMenu();

  }

  ir_pedido(idventa: number, idmesa: number, nombre_mesa: string) {
    ///alert();

    this.router.navigate(['/principal/venta/Pedido', idventa, idmesa, nombre_mesa]);
  }
  validar(event: any) {
    console.log(event.target.value);
    if (event.target.value != '') {
      this.btnlimpiar = true;
    } else {
      this.btnlimpiar = false;
    }
  }
  limpiar() {
    this.searchText = '';
    this.btnlimpiar = false;
  }

  @ViewChild('button') button!: ElementRef;
  longPress = 'first state';
  longPressing = 0;
  isLongPressed = false;

  onLongPress(estado_mesa: any, venta_id: any, mesa_id: any,estado_agrupado:any) {
    //alert(estado_mesa);
    let data: any = {};
    let _this = this;
    data["tipo_mesa"] = estado_mesa;
    data["venta_id"] = venta_id;
    data["mesa_id"] = mesa_id;
    data["estado_agrupado"]=estado_agrupado;
    const bottomSheetRef = this._bottomSheet.open(MenumesaSheet, {
      data: data,
    });

    bottomSheetRef.afterDismissed().subscribe((response) => {
      console.log('Bottom sheet has been dismissed.');
      console.log(response);
      if (response != undefined) {
        _this.funcion_controlador(response["id"], response["data"])
      }
    });

    // bottomSheetRef.dismiss();
  }
  funcion_controlador(id: number, data: any) {
    if (id == 1) {
      this.generar_cuenta(data);
    }
    if (id == 2) {
      this.cargar_mesas_seleccionar(data);

    }
    if (id == 3) {
      this.reservar_mesa(data);

    }
    if (id == 4) {
      this.anular_seleccionar(data);

    }
    if (id == 5) {
      this.anular_pedido(data);

    }
  }
  reservar_mesa(data:any)
  {
    this.ngxUiLoaderService.start();
    let _this = this;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    let request:any={};
   request["idsilla"]=data["mesa_id"];
   request["opcion"]=2;
    this.servicio.enviar_seguro('Web_service/reserva', request, token, 2).pipe().subscribe(
      (data: any) => {
        _this.ngxUiLoaderService.stop();
        _this._snackBar.open("SE PROCESO CORRECTAMENTE", '', {
          duration: 1 * 1000,
        });
        _this.cargar_mesas();
      });
  }
  generar_cuenta(data: any) {
    window.open(this.servicio.url_global + 'Precuenta/mostrar_comprobante/' + data["venta_id"], '_blank');
  }
  cargar_mesas_seleccionar(data: any) {
    let _this = this;
    let dialogRef = this.dialog.open(ModalMesa, {
      data: data,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
      if (result != undefined) {
        if (result["estado"]) {
          _this.cargar_mesas();
        }
      }
    });

  }

  anular_seleccionar(data:any)
  {
    this.ngxUiLoaderService.start();
    let _this = this;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    let request:any={};
   request["idsilla"]=data["mesa_id"];
    this.servicio.enviar_seguro('Web_service/anular_mesaagrupar', request, token, 2).pipe().subscribe(
      (data: any) => {
        _this.ngxUiLoaderService.stop();
        _this._snackBar.open("SE ANULO CORRECTAMENTE", '', {
          duration: 1 * 1000,
        });
        _this.cargar_mesas();
      });
  }
  anular_pedido(data:any)
  {
    this.ngxUiLoaderService.start();
    let _this = this;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    let request:any={};
   request["idsilla"]=data["mesa_id"];
    this.servicio.enviar_seguro('Web_service/anularpedido', request, token, 2).pipe().subscribe(
      (data: any) => {
        _this.ngxUiLoaderService.stop();
        _this._snackBar.open("SE ANULO CORRECTAMENTE", '', {
          duration: 1 * 1000,
        });
        _this.cargar_mesas();
      });
  }
  info: any[] = [];
  inf: any[] = [];
  constructor( private ngxUiLoaderService: NgxUiLoaderService,public dialog: MatDialog, private _bottomSheet: MatBottomSheet, private _snackBar: MatSnackBar, private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService, public servicio: Servicio) { }

  ngOnInit(): void {
    this.lista_opciones_tem = this.lista_opciones;
    this.cargar_mesas();
  }

  changes() {
    alert();
  }


  listatipomesa: any[] = [];
  cargar_mesas() {

    let _this = this;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    this.servicio.enviar_seguro('Web_service/cargar_mesas', { "tipo": this.selectedValue }, token, 2).pipe().subscribe(
      (data: any) => {
        console.log(data);
        _this.listatipomesa = data;
        _this.inf = [];
        _this.listatipomesa.forEach((tipo, index) => {

          let mes: any[] = tipo["tipo"]["mesas"];
          console.log(mes);
          _this.info = [];
          mes.forEach((m) => {
            _this.info.push(new Date(m["venta_pedidofecha"]));
          });

          _this.inf.push(_this.info);

        });

        // console.log(_this.inf[0]);

      });
  }

}


@Directive({
  selector: '[long-press]'
})
export class LongPress {
  pressing!: boolean;
  longPressing!: boolean;
  timeout: any;
  interval!: any;

  @Output()
  onLongPress = new EventEmitter();

  @Output()
  onLongPressing = new EventEmitter();

  @HostBinding('class.press')
  get press() { return this.pressing; }

  @HostBinding('class.longpress')
  get longPress() { return this.longPressing; }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any) {
    let _this = this;
    this.pressing = true;
    this.longPressing = false;
    this.timeout = setTimeout(() => {
      _this.longPressing = true;
      _this.onLongPress.emit(event);
      _this.interval = setInterval(() => {
        this.onLongPressing.emit(event);
      }, 50);
    }, 500);
  }

  @HostListener('touchend')
  @HostListener('mouseup')
  @HostListener('mouseleave')
  endPress() {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    this.longPressing = false;
    this.pressing = false;
  }
}

export interface Mesa {

  nombre: string;
  lista: number[],
  id: number,
  lista_agrupada:number[]
}
@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'menumesa.component.html',
})
export class MenumesaSheet {
  lista_opciones: Mesa[] = [

    {
      nombre: 'Cuenta',
      lista: [1],
      id: 1,
      lista_agrupada:[0,1]

    },
    {
      nombre: 'Unir',
      lista: [0, 1,2],
      id: 2,
      lista_agrupada:[0]

    },
    {
      nombre: 'Reservar',
      lista: [0,4],
      id: 3,
      lista_agrupada:[0,1]

    },
    {
      nombre: 'Anular agrupación',
      lista: [0,1,2],
      id: 4,
      lista_agrupada:[1]
    },
    {
      nombre: 'Anular reserva',
      lista: [2],
      id: 5,
      lista_agrupada:[0,1]

    },

  ];

  estado_mesa: number = 0;
  estado_agrupado:number=0;
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private _bottomSheetRef: MatBottomSheetRef<MenumesaSheet>) {
    console.log(data);
    this.estado_mesa = parseInt(data["tipo_mesa"]);
    this.estado_agrupado = parseInt(data["estado_agrupado"]);
  
    this.lista_opciones = this.lista_opciones.filter(x => x.lista.includes(this.estado_mesa) && x.lista_agrupada.includes(this.estado_agrupado) );
  }

  openLink(event: MouseEvent, tipo: number): void {
    // alert(tipo);
    let data: any = {

      "id": tipo,
      "data": this.data
    };
    this._bottomSheetRef.dismiss(data);
    event.preventDefault();
  }
}