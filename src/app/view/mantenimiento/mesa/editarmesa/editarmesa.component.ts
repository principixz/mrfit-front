import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Servicio} from '../../../../servicio/servicio';
import { AlertService, AuthenticationService } from '../../../../servicio';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ParamMap  } from '@angular/router';  
@Component({
  selector: 'app-editarmesa',
  templateUrl: './editarmesa.component.html',
  styleUrls: ['./editarmesa.component.css']
})
export class EditarmesaComponent implements OnInit {

 
  form: FormGroup;  
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
      descripcion: ['',[   Validators.required,]],
         id: ['',[   ]],
         lista: ['',[   Validators.required,]],
    
    });

  }
  
  titulo="";
  tipo_movimiento:any[]=[  ]
  
  texto_boton="Guardar";
  estado=true;
  lista_lugar:any=[];
  ngOnInit(): void {

    let _this=this;
    let usuario:any =  this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
   const token = usuario['Token'].toString();
   console.log("info.....");

   this.cargar_datos();
   this.activatedroute.data.subscribe(data => {
     
    console.log(data);
    _this.titulo=data["title"];
});



        this.route.paramMap.subscribe((params: ParamMap)  => {
          if  (params.get('id') !=  null  ) {
            _this.form.get('id')!.setValue(params.get('id'));
            _this.servicio.enviar_seguro('web_service/cargar_uno_mesa', {  'id':  params.get('id')  },  token).pipe().subscribe(
              (response:any) =>  {
              _this.form.get('descripcion')!.setValue(response['mesa_numero']);
                _this.form.get('lista')!.setValue(response['mesa_id_lugar']);

                
                //this.ngxUiLoaderService.stop();
              },  (error)  =>  {
                 // this.ngxUiLoaderService.stop();
                },
              );

          }});
  }

  cargar_datos(){

    let _this=this;
    let usuario:any =  this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
   const token = usuario['Token'].toString();
   

   _this.servicio.enviar_seguro('web_service/lista_lugar_mesas', { },  token).pipe().subscribe(
    (response:any) =>  {
      _this.lista_lugar=response["lista"];
    }
   );

  }
  onSubmit() {
    let _this=this;
    if ( this.form.valid ) {
    //  this.ngxUiLoaderService.start();
      let datos =  {};
      _this.texto_boton="Guardando...";
      _this.estado=false;
      datos = this.form.value;
      const user:any  = this.authenticationService.currentUserValue;
      // tslint:disable-next-line: no-string-literal
      const token = user['Token'];
      this.servicio.enviar_seguro('web_service/guardar_mesa', datos , token).pipe().subscribe(
        (response:any)  =>  {

          _this._snackBar.open(response["mensaje"],'',{
            duration: 2 * 1000,
          });
        //  this.ngxUiLoaderService.stop();
          // tslint:disable-next-line: no-string-literal 
       //   if  ( response['ok']  ) {
              // tslint:disable-next-line: no-string-literal
              //this.toastr.success( response['msg'], 'Registro exito', {
              //closeButton: false,
             // positionClass: 'toast-bottom-right',
           // });
              this.router.navigate(['/principal/mantenimiento/mesa/lista']);
         // }
        },
        (error) =>  {
          //this.ngxUiLoaderService.stop();
        },
      );
   }
  }
}
