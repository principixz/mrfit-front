import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Servicio } from '../../../servicio/servicio';
import { AlertService, AuthenticationService } from '../../../servicio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParamMap } from '@angular/router';
import { HttpClient,HttpHeaders  } from  '@angular/common/http';
@Component({
  selector: 'app-registrar-platonew',
  templateUrl: './registrar-platonew.component.html',
  styleUrls: ['./registrar-platonew.component.css']
})
export class RegistrarPlatonewComponent implements OnInit {
  imageURL: string = "../../../../assets/default.jpg";
  uploadForm!: FormGroup;
  showPreview(event:any) {
    let _this=this;
    
    if(event.files && event.files[0])
    {
    
       // Comprobamos que sea un formato de imagen
       if (event.files[0].type.match('image.*')) {
     
          // Inicializamos un FileReader. permite que las aplicaciones web lean 
          // ficheros (o información en buffer) almacenados en el cliente de forma
          // asíncrona
          // Mas info en: https://developer.mozilla.org/es/docs/Web/API/FileReader
          var reader=new FileReader();
  
          // El evento onload se ejecuta cada vez que se ha leido el archivo
          // correctamente
          reader.onload=function(e) {
            // $("#preview").attr("src",e.target.result);
           // _this.imageURL = e.target.result??'';
           alert( e?.target?.result)
          }
  
          // El evento onerror se ejecuta si ha encontrado un error de lectura
          reader.onerror=function(e) {
             alert("Error de lectura");
          }
  
          // indicamos que lea la imagen seleccionado por el usuario de su disco duro
          reader.readAsDataURL(event.files[0]);
       }else{
  
          // El formato del archivo no es una imagen
          alert("No es un formato de imagen");
       }
    }
    /*this.uploadForm.patchValue({
      avatar: file
    });*/
    //this.uploadForm.get('avatar').updateValueAndValidity()
    // File Preview

  }
  form: FormGroup;
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private loadingBar: LoadingBarService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private servicio: Servicio,
    public formbuilder: FormBuilder,
    private activatedroute: ActivatedRoute
  ) {
    this.form = this.formbuilder.group({
      producto_id: ['', []],
      codigo_barra: ['', []],
      codigo_referencia: ['', [Validators.required,]],
      tipo_moneda: ['', [Validators.required,]],
      moneda: ['', []],
      stock_minimo: ['', []],
      unidad: ['', []],
      descripcion: ['', []],
      categoria:['',[]],
      imagen: [null],
    });
  }

  titulo = "";
  tipo_movimiento: any[] = []
  bankFilterCtrl: any;
  texto_boton = "Guardar";
  estado = true;
  lista_moneda: [] = [];
  lista_unidad_medida: [] = [];
  lista_categoria: [] = [];
  cargar_moneda() {
    let _this = this;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();

    _this.servicio.enviar_seguro('web_service/lista_tipo_moneda', {}, token).pipe().subscribe(
      (response: any) => {
        _this.lista_moneda = response["lista"];
      });
  }
  cargar_unidad_medida() {
    let _this = this;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();

    _this.servicio.enviar_seguro('web_service/lista_unidad_medida', {}, token).pipe().subscribe(
      (response: any) => {
        _this.lista_unidad_medida = response["lista"];
      });
  }
  cargar_categoria() {
    let _this = this;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    _this.servicio.enviar_seguro('web_service/cargar_categoria_producto', {}, token).pipe().subscribe(
      (response: any) => {
        _this.lista_categoria = response;
      });
  }
  ngOnInit(): void {
    this.cargar_moneda();
    this.cargar_unidad_medida();
    this.cargar_categoria();
    let _this = this;
    let usuario: any = this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
    const token = usuario['Token'].toString();
    console.log("info.....");
    this.activatedroute.data.subscribe(data => {
      console.log(data);
      _this.titulo = data["title"];
    })
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id') != null) {
        _this.form.get('id')!.setValue(params.get('id'));
        _this.servicio.enviar_seguro('web_service/cargar_cliente_uno', { 'id': params.get('id') }, token).pipe().subscribe(
          (response: any) => {
            _this.form.get('nombres')!.setValue(response['cliente_nombres']);
            _this.form.get('dni')!.setValue(response['cliente_dni']);
            _this.form.get('telefono')!.setValue(response['cliente_telefono']);
            _this.form.get('direccion')!.setValue(response['cliente_direccion']);
            _this.form.get('correo')!.setValue(response['cliente_email']);
          }, (error) => {
            // this.ngxUiLoaderService.stop();
          },
        );

      }
    });
  }
  onSubmit() {
    let _this = this;
    if (this.form.valid) {
      //  this.ngxUiLoaderService.start();
      let datos = {};
      _this.texto_boton = "Guardando...";
      _this.estado = false;
      datos = this.form.value;
      const formData = new FormData();
      formData.append('producto_id', this.form.get('producto_id')!.value);
      formData.append('codigo_barra', this.form.get('codigo_barra')!.value);
      formData.append('codigo_referencia', this.form.get('codigo_referencia')!.value);
      formData.append('tipo_moneda', this.form.get('tipo_moneda')!.value);
      formData.append('moneda', this.form.get('moneda')!.value);
      formData.append('stock_minimo', this.form.get('stock_minimo')!.value);
      formData.append('unidad', this.form.get('unidad')!.value);
      formData.append('descripcion', this.form.get('descripcion')!.value);
      formData.append('categoria', this.form.get('categoria')!.value);
      formData.append('imagen', this.form.get('imagen')!.value);

  
      const user: any = this.authenticationService.currentUserValue;
      // tslint:disable-next-line: no-string-literal
      const token = user['Token'];

      const headers = new HttpHeaders({
        'Authorization': token,
      });
      this.http.post(this.servicio.url_global+'web_service/ws_guardar_plato', formData,{headers}).subscribe(
        (response:any) => {
          // Handle success
          console.log('Image uploaded successfully', response);

          _this._snackBar.open(response["mensaje"], '', {
            duration: 2 * 1000,
          });
          this.router.navigate(['/principal/venta/registrar_plato']);
          // }
        },
        (error) => {
          // Handle error
          console.error('Image upload failed', error);
        }
      );
    /*  this.servicio.enviar_seguro('web_service/guardar_cliente', datos, token).pipe().subscribe(
        (response: any) => {
          _this._snackBar.open(response["mensaje"], '', {
            duration: 2 * 1000,
          });
          this.router.navigate(['/principal/venta/registrar_plato']);
          // }
        },
        (error) => {
        },
      );*/
    }
  }
}
