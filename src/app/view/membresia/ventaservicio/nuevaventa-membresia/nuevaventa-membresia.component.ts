import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { Categoria1 } from 'src/app/modelo/Categoria';
import { Producto } from 'src/app/modelo/ProductoVenta';
import { Detalle } from 'src/app/modelo/Detalle';
import { Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Servicio } from 'src/app/servicio/servicio';
import { AlertService, AuthenticationService } from 'src/app/servicio';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DetalleVenta } from 'src/app/modelo/DetalleVenta';
import { Pedido } from 'src/app/modelo/Pedido';
import Keyboard from 'simple-keyboard'; 
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators'; 
import { ServicioVenta } from 'src/app/modelo/ServicioVenta';
import { ModalServicioCliente } from './modalclientes.component';
import { env } from 'process';
import { ModalServicio } from 'src/app/modal/modalServicio/modalServicio.component';

@Component({
  selector: 'app-nuevaventa-membresia',
  templateUrl: './nuevaventa-membresia.component.html',
  styleUrls: ['./nuevaventa-membresia.component.css']
})
export class NuevaventaMembresiaComponent implements OnInit {
  panelOpenState = true;
  controlnumero = new FormControl();
  controldireccion = new FormControl();
  idMembresia:string = "1";
  nombreMembresia:string = 'Seleccione Membresia';
  cantidadMeses:number = 1;
  costoMembresia: number = 0.00
  streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredStreets: any = [];
  lista_numero_celular = [];
  public userQuestion: string = "";
  userQuestionUpdate = new Subject<string>();

  private _filter(value: string) {
    console.log(value);
    alert();
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  ngOnInit(): void {
    let _this = this;
    this.cargar_inicial();
    this.controlnumero.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  buscar_numero(value: string) {
    alert();
    let request: any = {};
    request["term"] = value;
    let _this = this;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    this.servicio.enviar_seguro('Membresias/buscar_cliente_servicios2', request, token).pipe().subscribe(
      (data: any) => {
        _this.filteredStreets = data;
      });
  }

  eliminar_item(id: any) {
    this.listadetalle = this.listadetalle.filter(((item) => item.id != id || item.id != "1"));
  }

  onImgError(event: any) {
    event.target.src = this.servicio.url_global + '/public/defaultgym.jpg';
  }

  prueba: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9];
  listarServicios: ServicioVenta[] = [];
  listarServicios_temp: ServicioVenta[] = [];
  searchText: any = '';
  nombre_mesa = '';
  idventa = 0;
  idmesa = 0;

  precuenta() {
    if (this.idventa != 0) {
      window.open(this.servicio.url_global + 'Precuenta/mostrar_comprobante/' + this.idventa, '_blank');
    } else {
      this._snackBar.open("NO TIENE PRECUENTA DISPONIBLE", '', {
        duration: 1 * 1000,
      });
    }
  }

  seleccionar(id: any, index: any) {
    for (let index = 0; index < this.Lista_categoria.length; index++) {
      this.Lista_categoria[index]["estado_seleccionar"] = false;
    }
    this.Lista_categoria[index]["estado_seleccionar"] = true;
    if (id != 0) {
      this.listarServicios = this.listarServicios_temp.filter(number => number.id == id);
    } else {
      this.listarServicios = this.listarServicios_temp;
    }
  }

  deviceInfo!: any;
  estado_mobile: boolean = false;
  mostrar_buscador: boolean = false;

  @ViewChild("focussearch") focussearch!: ElementRef;

  buscador() {
    let _this = this;
    this.mostrar_buscador = true;
    setTimeout(() => {
      _this.focussearch.nativeElement.focus();
    }, 100);
  }

  mobil() {
    let _this = this;
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    if (isTablet || isMobile) {
      this.estado_mobile = true;
    }
    console.log(this.estado_mobile);
  }

  constructor(private deviceService: DeviceDetectorService, private modalService: NgbModal, private ngxUiLoaderService: NgxUiLoaderService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar, private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService, public servicio: Servicio
  ) {
    let _this = this;
    this.route.paramMap.subscribe((data: any) => {
      let info = data.params;
      _this.nombre_mesa = info["nombremesa"];
      _this.idventa = info["idventa"];
      _this.idmesa = info["idmesa"];
    });
    this.mobil();
  }

  btnlimpiar = false;
  estado_carga = true;
  base_url: any = "";
  listadetalle: ServicioVenta[] = [];
  listaClientesSeleccionados: any[] = [];
  cantidad_detalle: any = 0;
  total_: number = 0;

  total() {
    let _this = this;
    this.total_ = 0;
  }

  pagar() {
    if (this.listadetalle.length == 0) {
      this._snackBar.open("POR FAVOR INGRESE AL MENOS UN PLATO", '', {
        duration: 1 * 1000,
      });
      return;
    }

    const modalRef = this.modalService.open(ModalServicio, {
      animation: true,
      size: 'xl', windowClass: 'dark-modal',
      keyboard: false, backdrop: 'static',
    });

    let __this = this;
    let request: any = {};
    console.log(__this)
    request["idventa"] = __this.idventa;
    request["idmesa"] = __this.idmesa;
    request["pedido"] = __this.listadetalle;
    request["mesa"] = __this.nombre_mesa;
    request["clientesSeleccionados"] = __this.listaClientesSeleccionados;
    request["costoMembresia"] = __this.costoMembresia;
    request["nombreMembresia"] = __this.nombreMembresia;
    request["cantidadMeses"] = __this.cantidadMeses;
    request["idMembresia"] = __this.idMembresia;
    (<ModalServicio>modalRef.componentInstance).dataToTakeAsInput = request;

    modalRef.result.then((result) => {
      console.log(result);
      if (result["estado"]) {
        __this._snackBar.open(result["mensaje"], '', {
          duration: 3 * 1000,
        });
        __this.router.navigate(['/principal/membresia/ventaservicio/nuevo']);
      } else {
        if (result["mensaje"] != undefined) {
          __this._snackBar.open(result["mensaje"], 'ok', {
            duration: 3 * 1000,
          });
        }
      }
    }).catch((result) => {
      console.log(result);
    });
  }

  procesar() {
    if (this.listadetalle.length == 0) {
      this._snackBar.open("POR FAVOR INGRESE AL MENOS UN PLATO", '', {
        duration: 1 * 1000,
      });
      return;
    }
    this.ngxUiLoaderService.start();

    let __this = this;
    console.log(this)
    this.base_url = this.servicio.url_global;
    let request: any = {};
    request["idventa"] = __this.idventa;
    request["idmesa"] = __this.idmesa;
    request["pedido"] = __this.listadetalle;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    
    this.servicio.enviar_seguro('web_service/procesar_pedido', request, token).pipe().subscribe(
      (data: any) => {
        __this.ngxUiLoaderService.stop();
        if (data["estado"]) {
          __this._snackBar.open(data["mensaje"], '', {
            duration: 3 * 1000,
          });
          __this.router.navigate(['/principal/membresia/ventaservicio/nuevo']);
        } else {
          __this._snackBar.open(data["mensaje"], 'ok', {
            duration: 3 * 1000,
          });
        }
      });
  }

  obtenerCategoria(categoria_membresia: string): number {
    if (categoria_membresia.startsWith("Individual")) {
      return 1;
    } else {
      const match = categoria_membresia.match(/\((\d+)\)/);
      return match ? parseInt(match[1], 10) : 0; // Devuelve 0 si no encuentra el número entre paréntesis
    }
  }

  agregar_plato(plato: ServicioVenta, clientesActuales: any[] = []): void {
    let buscarindex = this.listadetalle.findIndex((item) => item.id == plato.id && item.estado =="1");
    let cantidad = 1;
    if (buscarindex != -1) {
      cantidad = 1;
    }
    
    const dialogConfig = new MatDialogConfig();
    let envio: any = {};
    let usuario: any = this.authenticationService.currentUserValue;
    const token = usuario['Token'].toString();
    envio["token"] = token;
    envio["url"] = this.base_url;
    envio["plato"] = plato;
    envio["cantidad"] = cantidad;
    envio["nombre_servicio"] = plato.nombreServicio;
    envio["cantidadRegistros"] = this.obtenerCategoria(plato.categoriaMembresia);
    envio["clientesActuales"] =  clientesActuales;
    console.log(this.obtenerCategoria(plato.categoriaMembresia))
    dialogConfig.data = envio;
    dialogConfig.panelClass = "modal_precio";
    dialogConfig.width = "80%";
    dialogConfig.height = "80%"; 
    dialogConfig.maxWidth = "100%";
    dialogConfig.maxHeight = "100%";
    let _this = this;
    const dialogRef = this.dialog.open(ModalServicioCliente, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        const clientes = Array.isArray(result) ? result : [result]; 
        this.listaClientesSeleccionados = [];
        clientes.forEach(cliente => {
          if (!this.listaClientesSeleccionados.some(item => item.id === cliente.idplato)) { 
            console.log('xxxxxx')
            console.log(cliente)
            this.listaClientesSeleccionados.push({
              id: cliente.idplato,
              nombre: cliente.nombre,
              documentoIdentidad: cliente.documentoIdentidad || cliente.comentario, // Asegúrate de que estás usando el campo correcto
              membresiaActual : cliente.iddetalle
            });
          }
        });
        console.log(this.listaClientesSeleccionados)
        if (result != '') {
          if (!this.listadetalle.some((detall) => detall.id === plato.id)) {
            this.idMembresia = plato.id
            this.nombreMembresia = plato.nombreServicio
            this.costoMembresia = (plato.precioServicio)
            this.total_ = (plato.precioServicio)
          }
          _this.listadetalle.unshift(result);
          _this._snackBar.open('Producto agregado correctamente', 'ok', {
            duration: 3 * 1000,
          });
          _this.cantidad_detalle = _this.listaClientesSeleccionados.length; 
        }
      }
      //    setTimeout(function(){ _this.drawer1.toggle(); }, 1000);
    });
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
    this.mostrar_buscador = false;
    this.searchText = '';
    this.btnlimpiar = false;
  }

  Lista_categoria: any = [];

  recargar() {
    let _this = this;
    this.estado_carga = true;
    this.base_url = this.servicio.url_global;
    let request: any = {};
    request["idventa"] = _this.idventa;
    let usuario: any = this.authenticationService.currentUserValue;
    const token = usuario['Token'].toString();
    this.servicio.enviar_seguro('Membresias/get_membresia_buscar', request, token).pipe().subscribe(
      (response: any) => {
        _this.listarServicios = [];
        _this.listarServicios_temp = [];
        _this.estado_carga = false;
        
        if (response && response.success && response.data) {
          response.data.forEach((element: any) => {
            _this.listarServicios.push(new ServicioVenta(
              element.id,
              element.nombre_servicio,
              element.precio_servicio,
              element.tipo_periodo,
              element.categoria_membresia,
              element.tipo_pago,
              element.estado,
              1
            ));
          });
        } else {
            console.warn('No se encontraron datos de membresías.');
        }
        _this.listarServicios_temp = _this.listarServicios;
      });
  }

  cargar_inicial() {
    let _this = this;
    this.estado_carga = true;
    this.base_url = this.servicio.url_global;
    let request: any = {};
    request["idventa"] = _this.idventa;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    this.servicio.enviar_seguro('Membresias/get_membresia_buscar', request, token).pipe().subscribe(
    (response: any) => {
      _this.listarServicios = [];
      _this.listarServicios_temp = [];
      _this.estado_carga = false;
      if (response && response.success && response.data) {
        response.data.forEach((element: any) => {
          _this.listarServicios.push(new ServicioVenta(
            element.id,
            element.nombre_servicio,
            element.precio_servicio,
            element.tipo_periodo,
            element.categoria_membresia,
            element.tipo_pago,
            element.estado,
            1
          ));
        });
      } else {
          console.warn('No se encontraron datos de membresías.');
      }

      _this.listarServicios_temp = _this.listarServicios;
    },
    (error: any) => {
      console.error('Error al cargar datos de membresías:', error);
      _this.estado_carga = false;
    }
  );
  }


  modificarMembresia(): void {
    const nuevaMembresia: ServicioVenta = {
      id: '1', // ID del servicio
      nombreServicio: 'Membresía Premium',
      precioServicio: 150.00, // Asegúrate de que este dato esté disponible
      tipoPeriodo: 'Mensual',
      categoriaMembresia: 'Individual',
      tipoPago: '1 Mes',
      estado: 'Activo',
      cantidad: 1 // Cantidad predeterminada para este servicio
    };
   
    this.agregar_plato(nuevaMembresia, this.listaClientesSeleccionados);
  }

  eliminarMembresia(): void {
    if (this.listadetalle.length > 0) {
      // Eliminar membresía de `listadetalle`
      this.listadetalle = [];
  
      // Reiniciar los valores relacionados con la membresía
      this.idMembresia = '';
      this.nombreMembresia = '';
      this.costoMembresia = 0;
      this.total_ = 0;
  
      // Reiniciar lista de clientes seleccionados
      this.listaClientesSeleccionados = [];
  
      // Mostrar mensaje de confirmación
      this._snackBar.open('Membresía eliminada correctamente', 'OK', { duration: 3000 });
    }
  }
}


