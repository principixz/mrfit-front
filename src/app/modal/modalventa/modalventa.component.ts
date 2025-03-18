
import { Select2OptionData } from 'ng-select2';
import { NuevoClienteModal } from '../nuevocliente/nuevocliente.component';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Input, ViewEncapsulation, PipeTransform, Pipe } from '@angular/core';

import { Inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Servicio } from '../../servicio/servicio';
import { AlertService, AuthenticationService } from '../../servicio';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DetalleVenta } from 'src/app/modelo/DetalleVenta';
import { Pedido } from 'src/app/modelo/Pedido';
import Keyboard from 'simple-keyboard';
import { ModalMesa } from '../modalmesa/modalmesa.component';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'modalventa.component.html',
  styleUrls: ['./modalventa.css']
})

export class ModalVenta implements OnInit {

  @ViewChild('search') searchElement!: ElementRef;

  checked = true;
  lis: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 42, 245, 2];
  listadetalle: Pedido[] = [];
  @Input() public dataToTakeAsInput: any;
  fechas = [];
  mesa = '';
  value = "";
  total = 0;
  restante = 0;
  recibido = 0;
  subtotal = 0;
  descuento = 0;
  precio_delivery = 0;
  keyboard!: Keyboard;
  keyboard_moneda!: Keyboard;
  public exampleData!: Array<Select2OptionData>;
  lista_formapago: any[] = [];
  estado_delivery: Boolean = true;

  form: FormGroup;

  public ajaxOptions: any;
  public formControl = new FormControl();
  myFlagForButtonToggle: String = "2";
  boton_validado = false;
  public addresses!: FormArray;
  //lista_precio:any;

  error_implementacion() {
    this._snackBar.open("POR EL MOMENTO LA FUNCION ESTA DESHABILITADA COMUNICAR CON EL ADMINISTRADOR ", 'OK', {
      duration: 2 * 1000,
      panelClass: 'snack-bar'
    });
  }
  unir_mesas() {
    this._snackBar.open("POR EL MOMENTO LA FUNCION ESTA DESHABILITADA COMUNICAR CON EL ADMINISTRADOR ", 'OK', {
      duration: 2 * 1000,
      panelClass: 'snack-bar'
    });
    /*  let _this = this;
    let data:any={};
        data["tipo_mesa"] = "";
    data["venta_id"] = "";
    data["mesa_id"] = this.dataToTakeAsInput["idmesa"];
    let dialogRef = this.dialog.open(ModalMesa, {
      data: data,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
      if (result != undefined) {
        if (result["estado"]) {
          this.activeModal.close(data);
        //  _this.cargar_mesas();
        }
      }
    }); */
  }
  limpiar_datos() {
    this.form.get("efectivo")?.setValue("0");
    this.keyboard.clearInput();
    this.calcular_total();
  }
  limpiar_datos1() {
    this.keyboard.setInput("backspace");
    //this.keyboard.clearInput();
    this.calcular_total();
  }
  someFunc($event: any) {
    if ($event.keyCode == 13) {
      $event.preventDefault();
      return false;
    }
    return true;
  }

  nuevocliente() {
    this.modalService.open(NuevoClienteModal, { size: 'lg' });
  }

  pagar(): void {
    let _this = this;
    let request: any = {};

    this.ngxUiLoaderService.start();
    request = this.dataToTakeAsInput;
    request["pago"] = this.form.value;
    console.log(request);

    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();

    this.servicio.enviar_seguro('web_service/procesar_venta_pago', request, token).pipe().subscribe(
      (data: any) => {
        this.ngxUiLoaderService.stop();
        this.activeModal.close(data);
       
        let dialogRef = this.dialog.open(Modalboleta, {
          data: data,
        });
       
      });
  }
  addAddress(): void {
    // alert();
    this.addresses = this.form.get('tarjeta') as FormArray;
    if (this.addresses.length < this.lista_formapago.length) {
      this.addresses.push(this.agregartarjeta());
    } else {

      this._snackBar.open("NO SE PUEDE AGREGAR ", 'OK', {
        duration: 2 * 1000,
        panelClass: 'snack-bar'
      });
    }

    //console.log(this.addresses);
    //  this.addresses = this.addressForm.get('addresses') as FormArray;
    //this.addresses.push(this.createAddress());
  }

  agregartarjeta(): FormGroup {
    //  console.log("creando")

    return this.formbuilder.group({
      tipo_comprobante: ['2'],
      monto: [0]
    });
  }
  get addressControls() {
    // return this.form.get('tarjeta')['controls'];
    return this.form.get('tarjeta') as FormArray;
    //return this.form.controls['tarjeta']?['controls']:null;
  }
  removeAddress(i: number) {
    this.addresses = this.form.get('tarjeta') as FormArray;
    if (this.addresses.length > 1) {
      this.addresses.removeAt(i);
      this.calcular_total();
    } else {
      this._snackBar.open("NO SE PUEDE ELIMINAR ", 'OK', {
        duration: 2 * 1000,
        panelClass: 'snack-bar'
      });
    }

  }
  constructor(
    public dialog: MatDialog, 
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private ngxUiLoaderService: NgxUiLoaderService,
    public datos: AuthenticationService,
    public formbuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public servicio: Servicio,
    public authenticationService: AuthenticationService,

  ) {


    this.form = this.formbuilder.group({
      tipo_comprobante: ['2', [Validators.required,]],
      delivery: [
        0
      ],
      cliente: ['', [Validators.required,]],
      efectivo: [0,],
      tarjeta: this.formbuilder.array([this.agregartarjeta()])
      //secondFormGroup:this.formbuilder.group({ tipo_comprobante: new FormControl(''), })
    });


  }




  tipo_doc: any[] = [];

  cargar_inicial() {

    let _this = this;
    let usuario: any = this.authenticationService.currentUserValue;
    //console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    this.servicio.enviar_seguro('web_service/cargar_tipo_documento', {}, token).pipe().subscribe(
      (data: any) => {

        _this.tipo_doc = data["tipo_documento"];
        _this.lista_formapago = data["formapago"];
        //    _this.myFlagForButtonToggle="2";


      });

    this.calcular_total();

  }

  calcular_total_pago(): number {
    let value = this.form.value;
    let total_dato = 0;
    // console.log(value);
    let efectivo = 0;
    if (value["efectivo"] != null) {
      efectivo = parseFloat(value["efectivo"]);
    }
    let tarjeta = 0;
    if (value["tarjeta"] != null) {
      let tarjetas: [] = value["tarjeta"];
      tarjetas.forEach(element => {
        //console.log(element);
        if (element['monto'] != null) {
          tarjeta += parseFloat(element['monto']);
        }
      });
    }

    total_dato = efectivo + tarjeta;
    return total_dato;
  }
  calcular_total() { 
    this.recibido = this.calcular_total_pago();
    let _this = this;
    let valor = _this.form.value;
    _this.form.updateOn;
    //  console.log(valor["delivery"]);
    this.subtotal = 0;
    this.precio_delivery = 0;
    if (valor["delivery"] != null) {
      this.precio_delivery = parseFloat(valor["delivery"]);

    }
    //console.log(this.listadetalle);
    this.listadetalle.forEach((va) => {
      _this.subtotal += va.cantidad * va.precio;
    });

    _this.total = _this.subtotal + _this.precio_delivery - _this.descuento;
    _this.restante = _this.total - _this.recibido;
    //    alert(_this.form.valid);
    _this.boton_validado = _this.form.valid;
  }

  onSubmit() {
    let _this = this;
    console.log(this.form.valid);
    if (this.form.valid) {
      ///alert();
      this.pagar();
    }

    return false;
  }
  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      display: {

        "{bksp}": "⌫",
      },
      //onKeyPress: (button: string) => this.onKeyPress(button),
      layout: {
        default: ["1 2 3", "4 5 6", "7 8 9", "0 . {bksp}"],

      },
      theme: "hg-theme-default hg-layout-default myTheme",
      buttonTheme: [
        {
          class: "hg-red",
          buttons: "1 "
        },
      ],

    });

    this.keyboard_moneda = new Keyboard(".keyboard2", {

      //onChange: input => this.onChange(input),
      onKeyPress: (button: string) => this.onKeyPress(button),
      layout: {
        default: ["10", "20 50", "100 200"],
        shift: ["! / #", "$ % ^", "& * (", "{shift} ) +", "{bksp}"]
      },

      buttonTheme: [
        {
          class: "hg-red",
          buttons: "10 "
        },
      ],



    });
  }
  onChange = (input: string) => {
    console.log(input);
    this.value = input;
    this.form.get("efectivo")?.setValue(input.toString());
    this.calcular_total();
  };
  onKeyPress = (button: string) => {
    console.log("Button pressed", button);
    let monto_presion = parseFloat(button);
    let monto_efectivo = this.form.get("efectivo")?.value;
    let double_efectivo = parseFloat(monto_efectivo.toString().replace(/,/g, ""));
    let total = double_efectivo + monto_presion;
    this.form.get("efectivo")?.setValue(total.toString());
    this.calcular_total();


    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };
  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  public event: EventEmitter<any> = new EventEmitter();
  options: any = {};
  public valueChanged(event: any) {
    console.log('value changed: ' + event);
    // alert();
    setTimeout(() => {
      this.calcular_total();
    }, 100);

  }
  ngOnInit(): void {
    let _this = this;
    this.listadetalle = this.dataToTakeAsInput["pedido"];
    this.mesa = this.dataToTakeAsInput["mesa"];
    this.cargar_inicial();

    this.ajaxOptions = {
      url: this.servicio.url_global + "Membresias/buscar_cliente_servicios",
      dataType: 'json',
      delay: 500,
      cache: false,
      data: (params: any) => {
        return {

          search: params.term,
          gotoPage: params.page,
          id: _this.form.value["tipo_comprobante"],
          totalpago: _this.total,
          tipo_pago: 1
        };
      },
      processResults: (data: any, params: any) => {
        params.page = params.page || 1;
        //  console.log(data);
        return {

          results: data,
        };
      }
    };




    this.options = {
      ajax: this.ajaxOptions,
      templateResult: this.templateResult,
      language: {
        searching: function () {
          return "Buscando...";
        },
        errorLoading: function () {
          return "Error en el resultado de la busqueda"
        }, noResults: function () {
          return "No se obtuvo resultados"
        },
      },
    };

    setTimeout(() => {

      this.searchElement.nativeElement.focus();
    }, 500);


    // console.log(this.dataToTakeAsInput);


  }

  public templateResult = (state: any): JQuery | string => {

    if (!state.documento) {
      return state.text;
    }
    return jQuery("<span><b>" + state.text + "</h5><h6 style='font-size:12px;'> " + state.documento + '</h6>');
  }
  closeModal() {
    this.activeModal.close({ "estado": false });
  }

}



@Component({
  selector: 'modalboleta-sheet-overview-example-sheet',
  templateUrl: './modalboleta.component.html',
})
export class Modalboleta implements OnInit{


  url_dato:string ="";
  cargar=false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public servicio: Servicio,public dialogRef: MatDialogRef<Modalboleta>,) {

  }
  ngOnInit(): void {
    this.cargar_datos();
  }
  cargar_datos(){
    let _this=this;
    console.log("estoy aqui");
    console.log(this.data);
    this.url_dato=this.servicio.url_global+"Ventas/mostrar_comprobante/"+this.data["idventa"];
    console.log( this.url_dato);
    this.cargar=true;
    setTimeout(() => {

      _this.dialogRef.close();
    }, 1500);
  
  }


}



@Pipe({ name: 'safe' })

export class SafePipe implements PipeTransform {

constructor(private sanitizer: DomSanitizer) { }
transform(url:string) {
 return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}