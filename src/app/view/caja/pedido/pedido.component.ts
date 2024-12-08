import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/servicio';
import { Servicio } from 'src/app/servicio/servicio';
import { es } from 'date-fns/locale';
import { Producto } from 'src/app/modelo/ProductoVenta';
import { Pedido } from 'src/app/modelo/Pedido';
import { formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalVenta } from '../../../modal/modalventa/modalventa.component';
import swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  canje(id: any, precio: any, cantidad: any, nombre: any, index: number) {

    const dialogRef = this.dialog.open(CanjePedidoModalComponent, {
      data: { id: id, precio: precio, cantidad: cantidad, nombre: nombre }
    });
    let _this = this;
    dialogRef.afterClosed().subscribe(result => {

      console.log(result);
      if (result != null) {
        if (result["estado"]) {

          this.recargar_datos();
         /* _this.listadetalle[index].cantidad = result["cantidad"];
          let monto_nuevo = 0;
          _this.listadetalle.forEach((ele) => {
            monto_nuevo += ele.cantidad * ele.precio;
          });
          _this.monto_total = monto_nuevo.toFixed(2);
          this.listatipomesa[this.index_mesa]["tipo"]["mesas"][this.index1_mesa]["venta_monto"] = _this.monto_total;*/


        }
      }
    });
  }
  eliminar(id: any, index: number) {
    const dialogRef = this.dialog.open(EliminarDetalleModalComponent, {
      data: { id: id }
    });
    let _this = this;
    dialogRef.afterClosed().subscribe(result => {

      console.log(result);
      if (result != null) {
        if (result["estado"]) {
          _this.listadetalle = _this.listadetalle.filter((ele) => ele.iddetalle.toString() != result["id_detalle_venta"].toString());
          let monto_nuevo = 0;
          _this.listadetalle.forEach((ele) => {
            monto_nuevo += ele.cantidad * ele.precio;
          });

          if (_this.listadetalle.length == 0) {
            _this.cargar_mesas();
            _this.cargarmesa = false;
          } else {
            _this.monto_total = monto_nuevo.toFixed(2);
            this.listatipomesa[this.index_mesa]["tipo"]["mesas"][this.index1_mesa]["venta_monto"] = _this.monto_total;
          }



        }
      }
    });
  }
  editar(id: any, precio: any, cantidad: any, nombre: any, index: number) {

    const dialogRef = this.dialog.open(EditarPedidoModalComponent, {
      data: { id: id, precio: precio, cantidad: cantidad, nombre: nombre }
    });
    let _this = this;
    dialogRef.afterClosed().subscribe(result => {

      console.log(result);
      if (result != null) {
        if (result["estado"]) {
          _this.listadetalle[index].cantidad = result["cantidad"];
          let monto_nuevo = 0;
          _this.listadetalle.forEach((ele) => {
            monto_nuevo += ele.cantidad * ele.precio;
          });
          _this.monto_total = monto_nuevo.toFixed(2);
          this.listatipomesa[this.index_mesa]["tipo"]["mesas"][this.index1_mesa]["venta_monto"] = _this.monto_total;


        }
      }
    });
  }
  active = 1;
  activado = 2;
  nombre_mesa = "";
  formulario!: FormGroup;
  tiempo = "";
  cargarmesa = false;
  options = {
    locale: es,
    addSuffix: true,
    includeSeconds: true,
    unit: "minute"
  };
  idventa = 0;
  idmesa = 0;
  cantidad_pedido = 0;

  eliminar_pedido() {
    const dialogRef = this.dialog.open(EliminarPedidoModalComponent, {
      data: { idventa: this.idventa }
    });
    let _this = this;
    dialogRef.afterClosed().subscribe(result => {
      if (result["estado"]) {
        _this.cargar_mesas();
        _this.cargarmesa = false;
      }
      /* console.log(result);
       if(result=='si')
       {
       //  alert("eliminar");
        let tempfile=this.filasource.data;
        tempfile = tempfile.filter((  (item) => item.id != id));
        this.filasource = new MatTableDataSource(tempfile);
        let _this=this;
        let usuario:any =  this.authenticationService.currentUserValue;
        console.log(usuario['Token']);
        const token = usuario['Token'].toString();
        this.servicio.enviar_seguro(this.url_eliminar,  {'id':id}  , token).pipe().subscribe(
         (data:any)  =>  {
           _this._snackBar.open(data["mensaje"],'',{
             duration: 2 * 1000,
           });
  
           _this.filasource.paginator = this.paginator;
           _this.filasource.sort = this.sort;
          // _this.dataSource = new MatTableDataSource(data["lista_concepto"]);
         
         });
  
       }*/
      // this.animal = result;
    });
  }
  precuenta() {
    // alert(this.idventa);
    window.open(this.servicio.url_global + 'Precuenta/mostrar_comprobante/' + this.idventa, '_blank');
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
      size: 'xl', windowClass: 'dark-modal', keyboard: false, backdrop: 'static'
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
        __this.cargarmesa = false;
        __this.cargar_mesas(); 

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
  constructor(private _formBuilder: FormBuilder, private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private authenticationService: AuthenticationService, public servicio: Servicio,
    private modalService: NgbModal, private ngxUiLoaderService: NgxUiLoaderService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar





  ) { }

  ngOnInit(): void {
    this.formulario = this._formBuilder.group({
      tipo_mesa: new FormControl('1',),
      //   formprecio: new FormControl(0),


    });
    this.cargar_mesas();
  }
  listatipomesa: any[] = [];
  //info:any[]=[];
  inf: any[] = [];




  cargar_mesas() {

    let _this = this;
    let info: any = [];
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    _this.cantidad_pedido = 0;
    this.servicio.enviar_seguro('Web_service/cargar_mesas', { "tipo": 3 }, token, 2).pipe().subscribe(
      (data: any) => {

        console.log(data);
        _this.listatipomesa = data;
        _this.inf = [];

        _this.listatipomesa.forEach((tipo, index) => {

          info = [];
          let mes: any[] = tipo["tipo"]["mesas"];
          console.log(mes);

          mes.forEach((m) => {
            _this.cantidad_pedido++;
            info.push({ "fecha": new Date(m["venta_pedidofecha"]), "estado": 0 });
          });

          _this.inf.push(info);

        });

        // console.log(_this.inf[0]);

      });
  }


  estado_carga: boolean = false;
  base_url = "";
  ListaProducto: Producto[] = [];
  listadetalle: Pedido[] = [];
  monto_total = "";
  total_cantidad = 0;
  index_mesa = 0;
  index1_mesa = 0;
  ver_pedido(idventa: number, idmesa: number, nombre_mesa: string, tipo_mesa: string, monto: string, tiempo: Date, index: number, index1: number) {
    this.idventa = idventa;
    this.idmesa = idmesa;
    this.cargarmesa = true;
    let tipos = [];
    this.listatipomesa.forEach((tipo, inde) => {
      console.log(tipo["tipo"]["mesas"]);

      //tipos=[];
      //tipos =tipo["tipo"];
      tipo["tipo"]["mesas"].forEach((tip: any, ind: any) => {
        // console.log(tip);
        this.inf[inde][ind]["estado"] = 0;

      });

    });
    this.inf[index][index1]["estado"] = 1;
    this.index_mesa = index;
    this.index1_mesa = index1;


    //alert(tiempo);
    let info = formatDistanceToNowStrict(tiempo, {
      roundingMethod: "round",
      locale: es,
      addSuffix: false,
      unit: "minute"
    });

    console.log(info);
    let inf = info.split(" ");
    let datos = inf[0];
    let ifpp = inf[1];
    this.tiempo = datos + " " + ifpp[0];
    this.nombre_mesa = nombre_mesa + "(" + tipo_mesa + ")";
    ///alert();
    //alert(idventa);
    //this.router.navigate(['/principal/venta/Pedido',idventa,idmesa,nombre_mesa]);
    let _this = this;
    this.estado_carga = true;
    this.base_url = this.servicio.url_global;
    let request: any = {};
    request["idventa"] = idventa;
    let usuario: any = this.authenticationService.currentUserValue;
    _this.monto_total = monto;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    _this.listadetalle = [];
    this.servicio.enviar_seguro('Web_service/buscar_producto', request, token, 2).pipe().subscribe(
      (data: any) => {
        _this.ListaProducto = [];
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
            element["producto_id_tipoproducto"],
            element["stock"],

            element["producto_encendido"],

          ));

        });
        _this.total_cantidad = 0;



        data["detalle"].forEach((element: any) => {
          _this.listadetalle.push(new Pedido(
            element["id_producto"],
            element["descripcion"],
            element["comentario"],
            element["precio"],
            element["cantidad"],
            2, element["iddetalle"],

          ));
        });
        _this.total_cantidad = _this.listadetalle.length;

        //    _this.total();

      });
  }
  

  recargar_datos(){
    let _this = this;
    this.estado_carga = true;
    this.base_url = this.servicio.url_global;
    let request: any = {};
    request["idventa"] = this.idventa;
    let usuario: any = this.authenticationService.currentUserValue;
    //_this.monto_total = monto;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    _this.listadetalle = [];
    this.servicio.enviar_seguro('Web_service/buscar_producto', request, token, 2).pipe().subscribe(
      (data: any) => {
        _this.ListaProducto = [];
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
            element["producto_id_tipoproducto"],
            element["stock"],

            element["producto_encendido"],

          ));

        });
        _this.total_cantidad = 0;



        data["detalle"].forEach((element: any) => {
          _this.listadetalle.push(new Pedido(
            element["id_producto"],
            element["descripcion"],
            element["comentario"],
            element["precio"],
            element["cantidad"],
            2, element["iddetalle"],

          ));
        });
        _this.total_cantidad = _this.listadetalle.length;
      //  _this.listadetalle = _this.listadetalle.filter((ele) => ele.iddetalle.toString() != result["id_detalle_venta"].toString());
        let monto_nuevo = 0;
        _this.listadetalle.forEach((ele) => {
          monto_nuevo += ele.cantidad * ele.precio;
        });

        if (_this.listadetalle.length == 0) {
          _this.cargar_mesas();
          _this.cargarmesa = false;
        } else {
          _this.monto_total = monto_nuevo.toFixed(2);
          this.listatipomesa[this.index_mesa]["tipo"]["mesas"][this.index1_mesa]["venta_monto"] = _this.monto_total;
        }


        

        //    _this.total();

      });
  
  }

}






@Component({
  selector: 'eliminar-modal',
  templateUrl: 'eliminar-pedido.component.html',
})
export class EliminarPedidoModalComponent {
  formulario_eliminar = new FormGroup({
    motivo_modal: new FormControl('', [Validators.required,]),
    eliminar_usuario_total: new FormControl('', [Validators.required,]),
    eliminar_contrasena_total: new FormControl('', [Validators.required,]),

  });

  button_aceptar: String = "Aceptar";
  estado_aceptar = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public servicio: Servicio, private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<any>, private _snackBar: MatSnackBar

  ) {
    console.log(this.data);
    //this.cargar_datos();
  }
  cargar_datos() {
    console.log(this.data["idventa"]);
    console.log(this.formulario_eliminar.value);
    let datos = this.formulario_eliminar.value;
    let idventa = this.data["idventa"];
    let request: any = {};
    request["idventa"] = this.data["idventa"];
    request["motivo_modal"] = datos["motivo_modal"];
    request["eliminar_usuario_total"] = datos["eliminar_usuario_total"];
    request["eliminar_contrasena_total"] = datos["eliminar_contrasena_total"];
    this.estado_aceptar = false;
    this.button_aceptar = "Procesando...";

    console.log(request);


    let _this = this;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    this.servicio.enviar_seguro('Web_service/ws_eliminar_pedido', request, token, 2).pipe().subscribe(
      (data: any) => {
        if (data["estado"]) {

          _this.estado_aceptar = true;
          _this.button_aceptar = "Aceptar";
          this.dialogRef.close(data);

          _this._snackBar.open(data["mensaje"], '', {
            duration: 2 * 1000,
          });
        } else {
          _this.estado_aceptar = true;
          _this.button_aceptar = "Aceptar";
          this.dialogRef.close(data);
          swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: data["mensaje"],

          })


        }

        //  _this.dataSource = new MatTableDataSource(data["lista_concepto"]);

      });

  }
}



@Component({
  selector: 'editar-modal',
  templateUrl: 'editar-pedido.component.html',
})
export class EditarPedidoModalComponent implements OnInit {
  valor_maximo = 100;
  ngOnInit() {

    let request: any = {};
    request["id"] = this.data["id"];

    let _this = this;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    this.servicio.enviar_seguro('Web_service/ws_estock_actualizar', request, token, 2).pipe().subscribe(
      (data: any) => {
        this.formulario_eliminar.get("stock_producto")?.setValue(data["stock"]);
        _this.valor_maximo = parseInt(data["stock"]);
      });

  }

  formulario_eliminar = new FormGroup({
    nombre_producto: new FormControl('', [Validators.required,]),
    precio_producto: new FormControl('', [Validators.required,]),
    stock_producto: new FormControl('', [Validators.required,]),
    cantidad_producto: new FormControl('', [Validators.required,]),

    eliminar_usuario_total: new FormControl('', [Validators.required,]),
    eliminar_contrasena_total: new FormControl('', [Validators.required,]),

  });

  button_aceptar: String = "Aceptar";
  estado_aceptar = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public servicio: Servicio, private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<any>, private _snackBar: MatSnackBar

  ) {
    console.log(this.data);
    this.formulario_eliminar.get("nombre_producto")?.setValue(this.data["nombre"]);
    this.formulario_eliminar.get("precio_producto")?.setValue(this.data["precio"]);
    this.formulario_eliminar.get("cantidad_producto")?.setValue(this.data["cantidad"]);
    //this.cargar_datos();
  }
  cargar_datos() {
    console.log(this.data["idventa"]);
    console.log(this.formulario_eliminar.value);
    let datos = this.formulario_eliminar.value;
    let idventa = this.data["idventa"];
    let request: any = {};
    request["id_detalle_venta"] = this.data["id"];
    request["precio"] = "";
    request["cantidad"] = datos["cantidad_producto"];
    request["usuario"] = datos["eliminar_usuario_total"];
    request["contrasena"] = datos["eliminar_contrasena_total"];

    this.estado_aceptar = false;
    this.button_aceptar = "Procesando...";

    console.log(request);


    let _this = this;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    this.servicio.enviar_seguro('Web_service/ws_editar_datos_detalle', request, token, 2).pipe().subscribe(
      (data: any) => {
        if (data["estado"]) {

          _this.estado_aceptar = true;
          _this.button_aceptar = "Aceptar";
          this.dialogRef.close(data);

          _this._snackBar.open(data["mensaje"], '', {
            duration: 2 * 1000,
          });
        } else {
          _this.estado_aceptar = true;
          _this.button_aceptar = "Aceptar";
          this.dialogRef.close(data);
          swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: data["mensaje"],

          })


        }

        //  _this.dataSource = new MatTableDataSource(data["lista_concepto"]);

      });




















  }
}




@Component({
  selector: 'eliminar-detalle-modal',
  templateUrl: 'eliminar-detalle.component.html',
})
export class EliminarDetalleModalComponent {
  formulario_eliminar = new FormGroup({
    motivo_modal: new FormControl('', [Validators.required,]),
    eliminar_usuario_total: new FormControl('', [Validators.required,]),
    eliminar_contrasena_total: new FormControl('', [Validators.required,]),

  });

  button_aceptar: String = "Aceptar";
  estado_aceptar = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public servicio: Servicio, private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<any>, private _snackBar: MatSnackBar

  ) {
    console.log(this.data);
    //this.cargar_datos();
  }
  cargar_datos() {
    console.log(this.data["idventa"]);
    console.log(this.formulario_eliminar.value);
    let datos = this.formulario_eliminar.value;
    let idventa = this.data["idventa"];
    let request: any = {};
    request["id_detalle_venta_modal"] = this.data["id"];
    request["motivo"] = datos["motivo_modal"];
    request["eliminar_usuario_total"] = datos["eliminar_usuario_total"];
    request["eliminar_contrasena_total"] = datos["eliminar_contrasena_total"];
    this.estado_aceptar = false;
    this.button_aceptar = "Procesando...";

    console.log(request);


    let _this = this;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    this.servicio.enviar_seguro('Web_service/ws_eliminar_pedido_detalle', request, token, 2).pipe().subscribe(
      (data: any) => {
        if (data["estado"]) {

          _this.estado_aceptar = true;
          _this.button_aceptar = "Aceptar";
          this.dialogRef.close(data);

          _this._snackBar.open(data["mensaje"], '', {
            duration: 2 * 1000,
          });
        } else {
          _this.estado_aceptar = true;
          _this.button_aceptar = "Aceptar";
          this.dialogRef.close(data);
          swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: data["mensaje"],

          })


        }

        //  _this.dataSource = new MatTableDataSource(data["lista_concepto"]);

      });

  }
}






@Component({
  selector: 'caje-modal',
  templateUrl: 'canje-pedido.component.html',
})
export class CanjePedidoModalComponent implements OnInit {
  valor_maximo = 100;
  habilidar_precio = true;
  cambio(valor: number) {
    // alert();
    if (valor == 1) {
         this.formulario_eliminar.get("precio_producto")?.setValue(this.data["precio"]);
         this.habilidar_precio = true;
    } else { 

      this.formulario_eliminar.get("precio_producto")?.setValue(0);
      this.habilidar_precio = false;
    }
  }
  ngOnInit() {

    let request: any = {};
    request["id"] = this.data["id"];

    /*  let _this = this;
      let usuario: any = this.authenticationService.currentUserValue;
      console.log(usuario['Token']);
      const token = usuario['Token'].toString();
      this.servicio.enviar_seguro('Web_Service/ws_estock_actualizar', request, token, 2).pipe().subscribe(
        (data: any) => {
          this.formulario_eliminar.get("stock_producto")?.setValue(data["stock"]);
          _this.valor_maximo = parseInt(data["stock"]);
        });*/

  }

  formulario_eliminar = new FormGroup({
    nombre_producto: new FormControl('', [Validators.required,]),
    precio_producto: new FormControl('', [Validators.required,]),
    stock_producto: new FormControl('', [Validators.required,]),
    cantidad_producto: new FormControl('', [Validators.required,]),

    eliminar_usuario_total: new FormControl('', [Validators.required,]),
    eliminar_contrasena_total: new FormControl('', [Validators.required,]),
    descuento: new FormControl('1', [Validators.required,])

  });
  total:number=0;
  button_aceptar: String = "Aceptar";
  estado_aceptar = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public servicio: Servicio, private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<any>, private _snackBar: MatSnackBar

  ) {
    console.log(this.data);
    
    this.total = this.data["cantidad"];
    this.formulario_eliminar.get("nombre_producto")?.setValue(this.data["nombre"]);
    this.formulario_eliminar.get("precio_producto")?.setValue(this.data["precio"]);
    this.formulario_eliminar.get("stock_producto")?.setValue(this.total-1);
    this.formulario_eliminar.get("cantidad_producto")?.setValue(1);


    //this.cargar_datos();
  }

   actualizarcanje():boolean{
		if ( this.formulario_eliminar.get("cantidad_producto")?.value > this.total) {
     // alert();
		//	$("#estockcanje_producto").val($("#estockcanje_productoi").val());
    this.formulario_eliminar.get("cantidad_producto")?.setValue(1);
    this.formulario_eliminar.get("stock_producto")?.setValue(this.total-1);
			return false;
		}


		if ( this.formulario_eliminar.get("cantidad_producto")?.value.toString() != '') { 
			let cantidad = this.total -  this.formulario_eliminar.get("cantidad_producto")?.value;
			this.formulario_eliminar.get("stock_producto")?.setValue(cantidad);
		}else{ 
    //  alert();
    //  this.formulario_eliminar.get("cantidad_producto")?.setValue(this.total);
		//	$("#estockcanje_producto").val($("#estockcanje_productoi").val());
		}
		return false;
	}
  cargar_datos() {
    console.log(this.data["idventa"]);
    console.log(this.formulario_eliminar.value);
    let datos = this.formulario_eliminar.value;
    let idventa = this.data["idventa"];
    let request: any = {};
    request["id_detalle_canje"] = this.data["id"];
   // request["precio"] = "";
    request["descuento"] = datos["descuento"];
    request["precio_canjeproducto"] = datos["eliminar_usuario_total"];
    request["preciocanje"] = datos["precio_producto"];
    request["estockcanje_productoi"] = datos["stock_producto"] + datos["cantidad_producto"];
    request["estockcanje_producto"] = datos["stock_producto"];
    request["cantidadcanje"] = datos["cantidad_producto"];
    request["usuariocanje"] = datos["eliminar_usuario_total"];
    request["contrasenacanje"] = datos["eliminar_contrasena_total"];





/*

    nombre_producto: new FormControl('', [Validators.required,]),
    precio_producto: new FormControl('', [Validators.required,]),
    stock_producto: new FormControl('', [Validators.required,]),
    cantidad_producto: new FormControl('', [Validators.required,]),

    eliminar_usuario_total: new FormControl('', [Validators.required,]),
    eliminar_contrasena_total: new FormControl('', [Validators.required,]),
    descuento: new FormControl('1', [Validators.required,])*/

    this.estado_aceptar = false;
    this.button_aceptar = "Procesando...";

    console.log(request);


    let _this = this;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    this.servicio.enviar_seguro('Web_service/ws_editar_canje_parte', request, token, 2).pipe().subscribe(
      (data: any) => {
        if (data["estado"]) {

          _this.estado_aceptar = true;
          _this.button_aceptar = "Aceptar";
          this.dialogRef.close(data);

          _this._snackBar.open(data["mensaje"], '', {
            duration: 2 * 1000,
          });
        } else {
          _this.estado_aceptar = true;
          _this.button_aceptar = "Aceptar";
          this.dialogRef.close(data);
          swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: data["mensaje"],

          })


        }

        //  _this.dataSource = new MatTableDataSource(data["lista_concepto"]);

      });




















  }
}




