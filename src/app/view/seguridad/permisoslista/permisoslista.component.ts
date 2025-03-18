import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from  'ng-select2';
import {Servicio} from '../../../servicio/servicio';
import {AuthenticationService} from '../../../servicio/authentication.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import {ValidatorFn ,FormBuilder, FormGroup, Validators, FormArray,FormControl,AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import {Var_menu} from '../../../variable_globales/var_menu';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-permisoslista',
  templateUrl: './permisoslista.component.html',
  styleUrls: ['./permisoslista.component.css']
})
export class PermisoslistaComponent implements OnInit {
  public exampleData:any;
  public modulos:any;
  formulario: FormGroup;
  subscription!: Subscription;
  public variable:any=[];
  public datos:any=[];

  c=-1;
  constructor(
   public  conexion:Servicio,
   private _formBuilder: FormBuilder,
    public usuario:AuthenticationService,
    public carga:NgxUiLoaderService,
    private toastr: ToastrService,
    //private toastr: ToastrService,
    private authenticationService: AuthenticationService,
   
    public varglobal:Var_menu
   
  ) { 

    this.formulario = this._formBuilder.group(
      {
        checkmodulo:  new FormArray([], minSelectedCheckboxes(1)),

      
        perfil_id: ['1',]
    });
  }

  
  get getcheckmodulo(): FormArray {
    return this.formulario.controls.checkmodulo   as FormArray;

};

  onTagChanged(data:any)
  {   
   // alert();
    console.log(data);
    let usuario:any =  this.authenticationService.currentUserValue;
    let token=usuario["Token"];
    this.carga.start();
   // alert(data);
   this.conexion.enviar_seguro("web_service/ws_traer_modulo",
   {
    "perfil_id":data.value
   },token).pipe().subscribe(
    response=>{

      this.getcheckmodulo.clear();
      console.log(response);
    this.modulos=response;
   // this.modulos.forEach(() => this.getcheckmodulo.push(new FormControl(false)));
   let con=0;
   for(let i=0;i<this.modulos.length;i++)
    {
      let sub=[];
        for (let j = 0; j < this.modulos[i].lista.length; j++) 
        {
         sub.push(con);
         con++;
          this.variable.push({
            "id": this.modulos[i].lista[j].id
          });


          this.getcheckmodulo.push(new FormControl(
            this.modulos[i].lista[j].estado==1?true:false
          ));        
        }

      this.datos.push(sub);
   }
    this.carga.stop();
    // this.exampleData=response;
    },
    error=>{
     this.carga.stop();
    }
  );

  }
  guardar(){
    //this.container.cargar_menu();
    let envio:any={};
    let form=this.formulario.value;
    const selectedOrderIds = this.formulario.value.checkmodulo
    .map((v:any, i:any) => v ? this.variable[i].id : null)
    .filter((v: null) => v !== null);
  console.log(selectedOrderIds);
   
    envio["perfil_id"]=form["perfil_id"];
    envio["modulo"]=selectedOrderIds;
    
    let usuario:any =  this.authenticationService.currentUserValue;
    let token=usuario["Token"];
    this.carga.start();
    this.conexion.enviar_seguro("web_service/ws_procesar_permiso",envio,token).pipe().subscribe(
      (response:any)=>{
        this.carga.stop();
        if(response["estado"]==1){
          this.toastr.success( response["msg"],'Registro exitoso',{
            closeButton: false,
            positionClass: "toast-bottom-right"
          });

        /*  this.cargar_menu();*/
        }else{
          this.toastr.error( response["msg"],'ERROR',{
            closeButton: false,
            positionClass: "toast-bottom-right"
          });

        }
      },
      error=>{
        this.carga.stop();
       this.toastr.error( error,'ERROR',{
          closeButton: false,
          positionClass: "toast-bottom-right"
        });
      }
    );





  }

  public cargar_menu()
  {
    let usuario:any =  this.authenticationService.currentUserValue;
    // tslint:disable-next-line: no-string-literal
    const token = usuario['Token'].toString();
    this.conexion.enviar_seguro('web_service/cargar_menu',  {}  , token).pipe().subscribe(
      (data)  =>  {
     //   const navItems: any = data;
    //    this.navItems = data;
     
        this.varglobal.updateSharedData(data);
       console.log( this.varglobal.getSharedData());
      },
      (error) =>  {
            console.log(error);
      },
    );
  }
  ngOnInit() {






    let usuario:any =  this.authenticationService.currentUserValue;
     let token=usuario["Token"];
     this.conexion.enviar_seguro("web_service/ws_cargar_perfil",{},token).pipe().subscribe(
       response=>{
         console.log(response);
        this.exampleData=response;
       },
       error=>{}
     );






    

  /*  this.exampleData = [
      {
        id: 'basic1',
        text: 'Basic 1'
      },
      {
        id: 'basic2',
        disabled: true,
        text: 'Basic 2'
      },
      {
        id: 'basic3',
        text: 'Basic 3'
      },
      {
        id: 'basic4',
        text: 'Basic 4'
      }
    ];*/
  }


}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: AbstractControl) => {
    if (formArray instanceof FormArray) {
      const totalSelected = formArray.controls
        .map((control) => control.value)
        .reduce((prev, next) => (next ? prev + next : prev), 0);
      return totalSelected >= min ? null : { required: true };
    }

    throw new Error('formArray is not an instance of FormArray');
  };

  return validator;
}
