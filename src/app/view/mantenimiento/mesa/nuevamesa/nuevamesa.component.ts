import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Servicio} from '../../../../servicio/servicio';
import { AlertService, AuthenticationService } from '../../../../servicio';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ParamMap  } from '@angular/router';  
@Component({
  selector: 'app-nuevamesa',
  templateUrl: './nuevamesa.component.html',
  styleUrls: ['./nuevamesa.component.css']
})
export class NuevamesaComponent implements OnInit {

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

         lista_numero: this.formbuilder.array([
       //   this.formbuilder.control('')
        ])
    
    });

  }

  get aliases() {
    return this.form.get('lista_numero') as FormArray;
  }
  
  titulo="";
  tipo_movimiento:any[]=[  ]
  
  texto_boton="Guardar";
  estado=true;
  lista_lugar:any=[];
  lista_numero:any=[];
  addAlias() {
    this.aliases.push(this.formbuilder.control('',[ Validators.required,]));
  }
  cargar_input(e:any)
  {
   console.log(e.target.value);
   if(e.target.value!=""){
    let numero=parseInt(e.target.value)

    this.aliases.clear();
    for (let j = 0; j < numero; j++) {
      this.addAlias();
      
    }

   }else{

    this.aliases.clear();
  
  }
  }
  cargar_detalle(val:any)
  {

   // alert();
   let inte=0;
   let _this=this;
   let inicio=parseInt(val.target.value);
 
   this.aliases.controls.forEach(element => {
    //alert();
    if(inte!=0){
       element.setValue((inicio+inte).toString());  
    }

    
    inte++;
    
   });

  }
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
      this.servicio.enviar_seguro('web_service/guardar_mesa_multiple', datos , token).pipe().subscribe(
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
