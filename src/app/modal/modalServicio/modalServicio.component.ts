// Imports
import { Select2OptionData } from 'ng-select2';
import { NuevoClienteModal } from '../nuevocliente/nuevocliente.component';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Input, ViewEncapsulation, PipeTransform, Pipe, QueryList, ViewChildren } from '@angular/core';
import { Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
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
import { ServicioVenta } from 'src/app/modelo/ServicioVenta';

// Componente Principal
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'modalServicio.component.html',
  styleUrls: ['./modalServicio.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalServicio implements OnInit {
  // ViewChild
  @ViewChild('search') searchElement!: ElementRef;
  @Input() public dataToTakeAsInput: any;

  // Propiedades
  checked = true;
  lis: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 42, 245, 2];
  
  listadetalle: Pedido[] = [];
  listaServicios: ServicioVenta[] = [];
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
  tipo_doc: any[] = [];
  public event: EventEmitter<any> = new EventEmitter();
  options: any = {};

  // Constructor
  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private ngxUiLoaderService: NgxUiLoaderService,
    public datos: AuthenticationService,
    public formbuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public servicio: Servicio,
    public authenticationService: AuthenticationService
  ) {
    this.form = this.formbuilder.group({
      tipo_comprobante: ['2', [Validators.required]],
      delivery: [0],
      cliente: ['', [Validators.required]],
      efectivo: [0],
      monto: [0],
      tarjeta: this.formbuilder.array([this.agregartarjeta()])
    });
  }

  // Lifecycle Hooks
  ngOnInit(): void {
    console.log(this.dataToTakeAsInput)
    const nombreMembresia = this.dataToTakeAsInput["nombreMembresia"];
    const clientes: Cliente[] = this.dataToTakeAsInput["clientesSeleccionados"];

    let descripcion = `${nombreMembresia}\n`; // Inicializamos con el nombre de la membresía

    clientes.forEach(cliente => {
      descripcion += `${cliente.nombre} - ${cliente.documentoIdentidad}\n`;
    });
    this.listaServicios.push(new ServicioVenta(this.dataToTakeAsInput["idMembresia"],descripcion,this.dataToTakeAsInput["costoMembresia"],
      '','','',1,1 ));
    this.listadetalle = this.dataToTakeAsInput["pedido"];
    this.mesa = this.dataToTakeAsInput["mesa"];
    
    this.cargar_inicial();
    this.configurarAjaxOptions();
    this.configurarBusqueda();
  }

  ngAfterViewInit() {
    this.configurarTeclados();
  }

  // Métodos Principales
  cargar_inicial() {
    let usuario: any = this.authenticationService.currentUserValue;
    const token = usuario['Token'].toString();
    
    this.servicio.enviar_seguro('Web_service/cargar_tipo_documento', {}, token).pipe().subscribe(
      (data: any) => {
        this.tipo_doc = data["tipo_documento"];
        this.lista_formapago = data["formapago"];
      });

    this.calcular_total();
  }

  pagar(): void {
    let request: any = {};
    this.ngxUiLoaderService.start();
  
    try {
      request = this.dataToTakeAsInput;
      let envioData: any = [];
      request["pago"] = this.form.value; 
      request["clientes"] = this.dataToTakeAsInput.clientesSeleccionados;
      request["listaServicios"] = this.listaServicios; 
  
      let usuario: any = this.authenticationService.currentUserValue;
      const token = usuario['Token'].toString(); 
      this.servicio.enviar_seguro('Web_service/procesar_venta_pago', request, token).pipe().subscribe(
        (data: any) => {
          try {
            this.ngxUiLoaderService.stop();
            this.activeModal.close(data);
            let dialogRef = this.dialog.open(ModalboletaServicio, {
              data: data,
            });
          } catch (error) {
            // Manejo de errores en el callback de éxito
            console.error('Error en el procesamiento del resultado:', error);
            this.ngxUiLoaderService.stop();
            this._snackBar.open('Hubo problemas internos. Comuníquese con su soporte.', 'Cerrar', { duration: 3000 });
          }
        },
        (error: any) => {
          // Manejo de errores HTTP
          console.error('Error en la solicitud:', error);
          this.ngxUiLoaderService.stop();
          this._snackBar.open('Hubo problemas internos. Comuníquese con su soporte.', 'Cerrar', { duration: 3000 });
        }
      );
    } catch (error) {
      // Manejo de errores generales
      console.error('Error inesperado:', error);
      this.ngxUiLoaderService.stop();
      this._snackBar.open('Hubo problemas internos. Comuníquese con su soporte.', 'Cerrar', { duration: 3000 });
    }
  }

  // Métodos de Formulario
  addAddress(): void {
    this.addresses = this.form.get('tarjeta') as FormArray;
    if (this.addresses.length < this.lista_formapago.length) {
      this.addresses.push(this.agregartarjeta());
    } else {
      this._snackBar.open("NO SE PUEDE AGREGAR ", 'OK', {
        duration: 2 * 1000,
        panelClass: 'snack-bar'
      });
    }
  }

  agregartarjeta(): FormGroup {
    return this.formbuilder.group({
      tipo_comprobante: ['2'],
      monto: [0]
    });
  }

  get addressControls() {
    return this.form.get('tarjeta') as FormArray;
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

  onSubmit() {
    if (this.form.valid) {
      this.pagar();
    }
    return false;
  }

  // Métodos de Cálculo
  calcular_total_pago(): number {
    let value = this.form.value;
    let efectivo = value["efectivo"] != null ? parseFloat(value["efectivo"]) : 0;
    let tarjeta = 0;

    if (value["tarjeta"] != null) {
      let tarjetas: [] = value["tarjeta"];
      tarjetas.forEach(element => {
        if (element['monto'] != null) {
          tarjeta += parseFloat(element['monto']);
        }
      });
    }

    return efectivo + tarjeta;
  }

  calcular_total() {
    this.recibido = this.calcular_total_pago();
    let valor = this.form.value;
    this.form.updateOn;
    
    this.subtotal = 0;
    this.precio_delivery = 0;
 
    this.listadetalle.forEach((va) => {
      this.subtotal += va.cantidad * va.precio;
    });
    // Verificar si subtotal es NaN y corregirlo a 0
    if (isNaN(this.subtotal)) {
      this.subtotal = 0;
    }
    this.listaServicios.forEach((va) => {
      this.subtotal += va.cantidad * (va.precioServicio);
    });
    this.total = this.subtotal + this.precio_delivery - this.descuento;
    this.restante = this.total - this.recibido;
    this.boton_validado = this.form.valid;
  }

  // Métodos de Teclado
  onChange = (input: string) => {
    this.value = input;
    this.form.get("efectivo")?.setValue(input.toString());
    this.calcular_total();
  };

  onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      this.handleShift();
      return;
    }

    let monto_presion = parseFloat(button);
    let monto_efectivo = this.form.get("efectivo")?.value;
    let double_efectivo = parseFloat(monto_efectivo.toString().replace(/,/g, ""));
    let total = double_efectivo + monto_presion;
    this.form.get("efectivo")?.setValue(total.toString());
    this.calcular_total();
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

  public valueChanged(event: any) {
    setTimeout(() => {
      this.calcular_total();
    }, 100);
  }

  // Métodos Auxiliares
  error_implementacion() {
    this._snackBar.open("POR EL MOMENTO LA FUNCION ESTA DESHABILITADA COMUNICAR CON EL ADMINISTRADOR ", 'OK', {
      duration: 2 * 1000,
      panelClass: 'snack-bar'
    });
  }

  unir_mesas() {
    this.error_implementacion();
  }

  limpiar_datos() {
    this.form.get("efectivo")?.setValue("0");
    this.keyboard.clearInput();
    this.calcular_total();
  }

  limpiar_datos1() {
    this.keyboard.setInput("backspace");
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

  closeModal() {
    this.activeModal.close({ "estado": false });
  }

  public templateResult = (state: any): JQuery | string => {
    if (!state.documento) {
      return state.text;
    }
    return jQuery("<span><b>" + state.text + "</h5><h6 style='font-size:12px;'> " + state.documento + '</h6>');
  }

  // Configuraciones
  private configurarAjaxOptions() {
    this.ajaxOptions = {
      url: this.servicio.url_global + "Membresias/buscar_cliente_servicios",
      dataType: 'json',
      delay: 500,
      cache: false,
      data: (params: any) => {
        return {
          search: params.term,
          gotoPage: params.page,
          id: this.form.value["tipo_comprobante"],
          totalpago: this.total,
          tipo_pago: 1
        };
      },
      processResults: (data: any, params: any) => {
        params.page = params.page || 1;
        return {
          results: data,
        };
      }
    };
  }

  private configurarBusqueda() {
    this.options = {
      ajax: this.ajaxOptions,
      templateResult: this.templateResult,
      language: {
        searching: () => "Buscando...",
        errorLoading: () => "Error en el resultado de la busqueda",
        noResults: () => "No se obtuvo resultados"
      },
    };

    setTimeout(() => {
      this.searchElement.nativeElement.focus();
    }, 500);
  }

  private configurarTeclados() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      display: {
        "{bksp}": "⌫",
      },
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
}

// Componente Modal Boleta
@Component({
  selector: 'modalboleta-sheet-overview-example-sheet',
  templateUrl: './modalboletaservice.component.html',
})
export class ModalboletaServicio implements OnInit {
  url_dato: string = "";
  cargar = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public servicio: Servicio,
    public dialogRef: MatDialogRef<ModalboletaServicio>
  ) {}

  ngOnInit(): void {
    this.cargar_datos();
  }

  cargar_datos() {
    this.url_dato = this.servicio.url_global + "Ventas/mostrar_comprobante/" + this.data["idventa"];
    this.cargar = true;
    setTimeout(() => {
      this.dialogRef.close();
    }, 1500);
  }
}

// Pipe Seguro
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

interface Cliente {
  nombre: string;
  documentoIdentidad: string;
  id?: string; // Opcional si no siempre está presente
}