import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { Categoria1 } from '../../../modelo/Categoria';
import { Producto } from '../../../modelo/ProductoVenta';
import { Detalle } from '../../../modelo/Detalle';
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
import { Servicio } from '../../../servicio/servicio';
import { AlertService, AuthenticationService } from '../../../servicio';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DetalleVenta } from 'src/app/modelo/DetalleVenta';
import { Pedido } from 'src/app/modelo/Pedido';
import Keyboard from 'simple-keyboard';
import { ModalVenta } from 'src/app/modal/modalventa/modalventa.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import {  Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged,  } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  
})
export class PedidoComponent implements OnInit {
  panelOpenState = true;
  controlnumero = new FormControl();
  controldireccion = new FormControl();
  
  streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredStreets:any= [];
  lista_numero_celular=[];

  public userQuestion: string="";
  userQuestionUpdate = new Subject<string>();
  private _filter(value: string) {
    console.log(value);
    alert();
    //const filterValue = this._normalizeValue(value);
   // return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  ngOnInit(): void {
    let _this=this;
    this.cargar_inicial();
  this.controlnumero.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
   /* this.userQuestionUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        _this.buscar_numero(value);
     //   this.consoleMessages.push(value);
      });*/
  }
  buscar_numero(value:string)
  {
    alert();
    let request: any = {};
   request["term"] = value;
   let _this=this;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    this.servicio.enviar_seguro('Membresias/buscar_cliente_servicios2', request, token).pipe().subscribe(
      (data: any) => {

        _this.filteredStreets=data;
      });
  }








  eliminar_item(id: any) {
    // alert(id);
    this.listadetalle = this.listadetalle.filter(((item) => item.idplato != id || item.iddetalle != "1"));
  }
  onImgError(event: any) {
    event.target.src = this.servicio.url_global + '/public/default.jpg';

    //Do other stuff with the event.target
  }
  prueba: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9];
  ListaProducto: Producto[] = [];
  ListaProducto_temp: Producto[] = [];
  searchText: any = '';
  nombre_mesa = '';
  idventa = 0;
  idmesa = 0;

  precuenta() {
    // alert(this.idventa);
    if (this.idventa != 0) {
      window.open(this.servicio.url_global + 'Precuenta/mostrar_comprobante/' + this.idventa, '_blank');
    }
    else {
      this._snackBar.open("NO TIENE PRECUENTA DISPONIBLE", '', {
        duration: 1 * 1000,
      });
    }
  }
  seleccionar(id: any, index: any) {
    // alert(id);
    //this.Lista_categoria[index]["estado_seleccionar"]=true;
    for (let index = 0; index < this.Lista_categoria.length; index++) {
      // const element = array[index];
      this.Lista_categoria[index]["estado_seleccionar"] = false;
    }
    this.Lista_categoria[index]["estado_seleccionar"] = true;
    if (id != 0) {
      this.ListaProducto = this.ListaProducto_temp.filter(number => number.categoria_id == id);
    } else {
      this.ListaProducto = this.ListaProducto_temp;
    }


  }
  deviceInfo !:any;
  estado_mobile:boolean=false;
  mostrar_buscador:boolean=false;
  @ViewChild("focussearch") focussearch ! : ElementRef;
  buscador()
  {
    let _this=this;
    this.mostrar_buscador=true;

    setTimeout(() => {
      _this.focussearch.nativeElement.focus();
    }, 100);
  }

  mobil(){
    let _this=this;
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    if(isTablet || isMobile){
      this.estado_mobile=true;
    }
    console.log(this.estado_mobile);
    
  }
  constructor(private deviceService: DeviceDetectorService,private modalService: NgbModal, private ngxUiLoaderService: NgxUiLoaderService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar, private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService, public servicio: Servicio
  ) {
    let _this = this;
    this.route.paramMap.subscribe((data: any) => {
      // console.log(data.params);
      let info = data.params;
      _this.nombre_mesa = info["nombremesa"];
      _this.idventa = info["idventa"];
      _this.idmesa = info["idmesa"];
    });
    this.  mobil();
  }
  btnlimpiar = false;
  estado_carga = true;
  base_url: any = "";
  listadetalle: Pedido[] = [];
  cantidad_detalle: any = 0;
  total_: number = 0;
  total() {
    let _this = this;
    this.total_ = 0;
    this.listadetalle.forEach((va) => {
      _this.total_ += va.cantidad * va.precio;
    });
  }

  pagar() {

    if (this.listadetalle.length == 0) {
      this._snackBar.open("POR FAVOR INGRESE AL MENOS UN PLATO", '', {

        duration: 1 * 1000,
      });
      return;
      //return false;
    }

    const modalRef = this.modalService.open(ModalVenta, {
      animation: true,
      size: 'xl', windowClass: 'dark-modal',
       keyboard: false, backdrop: 'static',
       
    });

    let __this = this;
    let request: any = {};
    request["idventa"] = __this.idventa;
    request["idmesa"] = __this.idmesa;
    request["pedido"] = __this.listadetalle;
    request["mesa"] = __this.nombre_mesa;
    (<ModalVenta>modalRef.componentInstance).dataToTakeAsInput = request;

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
      //return false;
    }
    this.ngxUiLoaderService.start();

    let __this = this;
    this.estado_carga = true;
    this.base_url = this.servicio.url_global;
    let request: any = {};
    request["idventa"] = __this.idventa;
    request["idmesa"] = __this.idmesa;
    request["pedido"] = __this.listadetalle;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();

    this.servicio.enviar_seguro('Web_service/procesar_pedido', request, token).pipe().subscribe(
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


  agregar_plato(plato: Producto) {

    //tempfile = tempfile.filter((  (item) => item.id != id));
    let buscarindex = this.listadetalle.findIndex((item) => item.idplato == plato.id && item.estado == 1);
    console.log(plato);
    let cantidad = 1;
    if (buscarindex != -1) {

      cantidad = this.listadetalle[buscarindex].cantidad;

    }
    const dialogConfig = new MatDialogConfig();
    let envio: any = {};
    envio["url"] = this.base_url;
    envio["plato"] = plato;
    envio["cantidad"] = cantidad;
    dialogConfig.data = envio;
    dialogConfig.panelClass = "modal_precio";
    let _this = this;
    const dialogRef = this.dialog.open(Modalplato, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      //_this.drawer1.toggle();
      console.log(result);
      console.log(`Dialog result: ${result}`);
      if (result != null) {

        if (result != '') {
          console.log("estoy aqui");
          console.log(result);
          _this.listadetalle = _this.listadetalle.filter(((item) => item.idplato != result.idplato || item.iddetalle != "1"));
          //_this.listadetalle = _this.listadetalle.filter(((item) => item.idplato != result.id || item.estado != 1));
          _this.listadetalle.unshift(result);
          console.log(_this.listadetalle);
          _this._snackBar.open('Producto agregado correctamente', 'ok', {
            duration: 3 * 1000,
          });
          _this.cantidad_detalle = _this.listadetalle.length;
          _this.total();
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
    this.mostrar_buscador=false;
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
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    this.servicio.enviar_seguro('Web_service/buscar_producto', request, token).pipe().subscribe(
      (data: any) => {
        _this.ListaProducto = [];
        _this.ListaProducto_temp = [];
        //  _this.listadetalle=[];
        _this.estado_carga = false;
        data["productos"].forEach((element: any) => {
          _this.ListaProducto.push(new Producto(
            element["producto_id"],
            element["producto_descripcion"],
            '',
            element["imagen"],
            '',
            element["producto_precio"],
            element["categoria_producto_id"],
            element["stock"],
            element["producto_encendido"],
          ));
        });

        _this.ListaProducto_temp = _this.ListaProducto;

  
       // _this.total();

      });
    this.servicio.enviar_seguro('Web_service/cargar_categoria_producto', {}, token).pipe().subscribe(
      (data: any) => {
        _this.Lista_categoria = data;
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
    this.servicio.enviar_seguro('Membresias/buscar_producto', request, token).pipe().subscribe(
      (data: any) => {
        this.ListaProducto = [];
        this.ListaProducto_temp = [];
        this.estado_carga = false;
    
        // Validar que "productos" sea un objeto y convertirlo en un arreglo
        if (data["productos"] && typeof data["productos"] === "object") {
          const productosArray = Object.values(data["productos"]);
    
          productosArray.forEach((element: any) => {
            this.ListaProducto.push(new Producto(
              element["producto_id"],
              element["producto_descripcion"],
              '',
              element["imagen"],
              '',
              element["producto_precio"],
              element["categoria_producto_id"],
              element["stock"],
              element["producto_encendido"],
            ));
          });
        } else {
          console.error('El campo "productos" no tiene el formato esperado:', data["productos"]);
        }

        _this.ListaProducto_temp = _this.ListaProducto;

        data["detalle"].forEach((element: any) => {
          _this.listadetalle.push(new Pedido(
            element["id_producto"],
            element["descripcion"],
            element["comentario"],
            element["precio"],
            element["cantidad"],
            2
            , element["iddetalle"]
          ));
        });
        _this.total();

      });
    this.servicio.enviar_seguro('Web_service/cargar_categoria_producto', {}, token).pipe().subscribe(
      (data: any) => {
        _this.Lista_categoria = data;
      });
    

  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'modalprecio.component.html',
  styleUrls:["./modalprecio.css"]
})
export class Modalplato {
  cantidad: number = 1;
  estado = false;
  total = 0;
  precio = 0;
  stock = 0;
  base_url = "";
  producto: Producto;
  detalle_producto!: Pedido;
  enviar(form: any) {
    //alert(form);
    console.log(form.value);
    this.detalle_producto = new Pedido(
      this.producto.id,
      this.producto.nombre,
      form.value["texto"],
      parseFloat(this.producto.precio),
      this.cantidad,
      1, "1"
    );
    /* this.detalle_producto=new DetalleVenta(
      parseFloat( this.producto.id),
      this.producto.nombre,
       parseFloat(this.producto.precio),
       this.cantidad,
      0,
 
     form.value["texto"],
    
     );*/
    console.log(this.detalle_producto);
    this.dialogRef.close(this.detalle_producto);

  }

  // seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  formulario!: FormGroup;
  ngOnInit(): void {

    this.base_url = this.data.url;
    this.cantidad = this.data.cantidad;
    this.precio = parseFloat(this.producto.precio);
    this.calculo_total();
    this.stock = this.producto.stock;
    this.formulario = this._formBuilder.group({
      texto: new FormControl('',),
      //   formprecio: new FormControl(0),


    });
    // if(this.data.lista_precio.length!=1 )
    //{//alert();
    // this.formulario.addControl('formprecio', new FormControl(0));

    //}
  };
  agregar() {
    //alert();
  }
  constructor(
    public dialogRef: MatDialogRef<Detalle>,
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    public servicio: Servicio,

    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);
    this.producto = this.data.plato;

  }
  aumentar() {
    this.cantidad++;

    if (this.cantidad > 1) {
      this.estado = true;
    }
    this.calculo_total();

  }
  disminuir() {
    if (this.cantidad == 2) {
      this.estado = false;

    }
    this.cantidad--;
    this.calculo_total();
  }
  calculo_total() {
    this.total = this.precio * this.cantidad;

  }
  onImgError1(event: any) {
    //event.target.src = this.base_url+"public/default.jpg";
    event.target.src = this.servicio.url_global + '/public/default.jpg';

    //Do other stuff with the event.target
  }
}
