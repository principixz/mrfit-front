


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Servicio} from '../../../servicio/servicio';
import { AlertService, AuthenticationService } from '../../../servicio';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ParamMap  } from '@angular/router';
@Component({
  selector: 'app-modulonuevo',
  templateUrl: './modulonuevo.component.html',
  styleUrls: ['./modulonuevo.component.css']
})
export class ModulonuevoComponent implements OnInit {

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
         icono: ['',[   Validators.required,]],
         url: ['',[   Validators.required,]],
         modulopadre: ['',[   Validators.required,]],
    
    });

  }
  
  titulo="";
  lista_padre:any[]=[  ]
  
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
            _this.servicio.enviar_seguro('web_service/cargar_modulo_uno', {  'id':  params.get('id')  },  token).pipe().subscribe(
              (response:any) =>  {
              _this.form.get('descripcion')!.setValue(response['modulo_nombre']);
              _this.form.get('icono')!.setValue(response['modulo_icono']);
              _this.form.get('url')!.setValue(response['modulo_url']);
              _this.form.get('modulopadre')!.setValue(response['modulo_padre']);
                //_this.form.get('tipo')!.setValue(response['id_tipo_movimiento']);

                
                //this.ngxUiLoaderService.stop();
              },  (error)  =>  {
                 // this.ngxUiLoaderService.stop();
                },
              );

          }});




          this.servicio.enviar_seguro('Web_Service/lista_modulopadre',  {}  , token).pipe().subscribe(
            (data:any)  =>  {
        
               _this.lista_padre=data["lista_concepto"];
                        
                });








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
      this.servicio.enviar_seguro('web_service/guardar_modulo', datos , token).pipe().subscribe(
        (response:any)  =>  {

          _this._snackBar.open(response["mensaje"],'',{
            duration: 2 * 1000,
          });
        
              this.router.navigate(['/principal/seguridad/modulo/lista']);
         // }
        },
        (error) =>  {
          //this.ngxUiLoaderService.stop();
        },
      );
   }
  }
}

