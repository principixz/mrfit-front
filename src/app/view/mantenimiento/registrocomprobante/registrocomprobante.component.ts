import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AlertService, AuthenticationService } from 'src/app/servicio';
import { Servicio } from 'src/app/servicio/servicio';
import { FormArray, FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-registrocomprobante',
  templateUrl: './registrocomprobante.component.html',
  styleUrls: ['./registrocomprobante.component.css']
})
export class RegistrocomprobanteComponent implements OnInit {
  titulo="";
  navLinks: any[];
  activeLinkIndex = -1; 

  form: FormGroup;  


  texto_boton="Guardar";
  estado=false;
  constructor(
    private _snackBar: MatSnackBar,
    private loadingBar: LoadingBarService,
    private authenticationService: AuthenticationService,
     private alertService: AlertService,
     private route: ActivatedRoute,
     private router: Router,
     private servicio:Servicio,
     public formbuilder:FormBuilder,
     private activatedroute:ActivatedRoute
  ) { 

    this.form = this.formbuilder.group({
      razon_social: ['',[   Validators.required,]],
      empresa_direccion: ['',[Validators.required,   ]],
      empresa_telefono: ['',[   Validators.required,]],
      empresa_correo: ['',[   Validators.required]],
      empresa_abreviatura: ['',[   ]],
      empresa_nombre_comercial: ['',[   Validators.required,]],
      empresa_token_facturacion: ['',[   Validators.required,]],
      empresa_icono: ['',[   Validators.required,]],
      empresa_fondo: ['',[   Validators.required,]],
      empresa_color: ['',[   ]],




  
    
    });


    this.navLinks = [
      {
          label: 'Datos de empresa',
          link: './datos',
          index: 0
      }, {
          label: 'Registro Comprobante',
          link: './registro',
          index: 1
      }, 
  ];
  }

  ngOnInit(): void {
    let _this=this;
    this.activatedroute.data.subscribe(data => {
     
      console.log(data);
      _this.titulo=data["title"];
  });
this. cargardatos();

  this.router.events.subscribe((res) => {
    this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
});
  }

  cargardatos()
  {
    let _this=this;
    let usuario:any =  this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
   const token = usuario['Token'].toString();
   

   _this.servicio.enviar_seguro('Web_service/ws_cargar_empresa', { },  token).pipe().subscribe(
    (response:any) =>  {
      _this.form.get('razon_social')!.setValue(response[0]['empresa_razon_social']);
      _this.form.get('empresa_direccion')!.setValue(response[0]['empresa_direccion']);
      _this.form.get('empresa_telefono')!.setValue(response[0]['empresa_telefono']);
      _this.form.get('empresa_correo')!.setValue(response[0]['empresa_correo']);
      _this.form.get('empresa_nombre_comercial')!.setValue(response[0]['empresa_nombre_comercial']);
      _this.form.get('empresa_abreviatura')!.setValue(response[0]['empresa_abreviatura']);

      _this.form.get('empresa_token_facturacion')!.setValue(response[0]['empresa_token_facturacion']);
      _this.form.get('empresa_icono')!.setValue(response[0]['empresa_icono']);
      _this.form.get('empresa_fondo')!.setValue(response[0]['empresa_fondo']);
      _this.form.get('empresa_color')!.setValue(response[0]['empresa_color']);




    }
   );
  }
  

  onSubmit() {
    let _this=this;

    //  this.ngxUiLoaderService.start();
      let datos =  {};
     
      datos = this.form.value;
      const user:any  = this.authenticationService.currentUserValue;
     
      const token = user['Token'];

      _this.texto_boton="Guardando...";
      _this.estado=true;
      this.servicio.enviar_seguro('Web_service/ws_guardar_empresa', datos , token).pipe().subscribe(
        (response:any)  =>  {

          _this._snackBar.open(response["mensaje"],'',{
            duration: 2 * 1000,
          });
          
          _this.texto_boton="Guardar";
          _this.estado=false;
            
           //   this.router.navigate(['/principal/mantenimiento/mesa/lista']);
       
        },
        (error) =>  {
       
        },
      );
   
  }
}
