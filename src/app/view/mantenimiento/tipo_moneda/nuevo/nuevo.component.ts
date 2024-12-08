import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Servicio} from '../../../../servicio/servicio';
import { AlertService, AuthenticationService } from '../../../../servicio';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ParamMap  } from '@angular/router';  
@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoTipoMonedaComponent implements OnInit {

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
         id: ['',[   ]]
    
    });

  }
  
  titulo="";
  tipo_movimiento:any[]=[  ]
  
  texto_boton="Guardar";
  estado=true;
  ngOnInit(): void {

    let _this=this;
    let usuario:any =  this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
   const token = usuario['Token'].toString();
   console.log("info.....");
   this.activatedroute.data.subscribe(data => {
     
    console.log(data);
    _this.titulo=data["title"];
})


        this.route.paramMap.subscribe((params: ParamMap)  => {
          if  (params.get('id') !=  null  ) {
            _this.form.get('id')!.setValue(params.get('id'));
            _this.servicio.enviar_seguro('Web_service/cargar_uno_tipo_moneda', {  'id':  params.get('id')  },  token).pipe().subscribe(
              (response:any) =>  {
              _this.form.get('descripcion')!.setValue(response['moneda_descripcion']);
                //_this.form.get('tipo')!.setValue(response['id_tipo_movimiento']);

                
                //this.ngxUiLoaderService.stop();
              },  (error)  =>  {
                 // this.ngxUiLoaderService.stop();
                },
              );

          }});
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
      this.servicio.enviar_seguro('Web_service/guardar_tipo_moneda', datos , token).pipe().subscribe(
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
              this.router.navigate(['/principal/mantenimiento/tipo_moneda/lista']);
         // }
        },
        (error) =>  {
          //this.ngxUiLoaderService.stop();
        },
      );
   }
  }
}
