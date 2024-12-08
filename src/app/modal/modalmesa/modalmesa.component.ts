
import { Select2OptionData } from 'ng-select2';
import { NuevoClienteModal } from '../nuevocliente/nuevocliente.component';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Input, ViewEncapsulation } from '@angular/core';

import { Inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Servicio } from '../../servicio/servicio';
import { AlertService, AuthenticationService } from '../../servicio';

import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'dialog-elements-example-mesa',
  templateUrl: 'modalmesa.component.html',
  styleUrls: ['./modalmesa.css']
})

export class ModalMesa implements OnInit {
  form!: FormGroup;
  lista_datos:any=[];
  text_boton="Guardar";
  button_estado=false;
  carga_inicial=false;
    ngOnInit(): void {
     
     //  throw new Error('Method not implemented.');
    }
    constructor( private ngxUiLoaderService: NgxUiLoaderService,private fb: FormBuilder,private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data:any,private _snackBar: MatSnackBar,private route: ActivatedRoute,
      private router: Router,public dialogRef: MatDialogRef<ModalMesa>,
    private authenticationService: AuthenticationService,public servicio:Servicio) {
      this.    cargara_mesas_nueva();
      this.form = this.fb.group({
        arraymesas: this.fb.array([])
      })
     }

     onCheckboxChange(e: any) {
      console.log(e);
      const checkArray: FormArray = this.form.get('arraymesas') as FormArray;
      if (e.checked) {
        checkArray.push(new FormControl(e.source.value));
      } else {
        let i: number = 0;
        checkArray.controls.forEach((item: any) => {
          if (item.value == e.source.value) {
            checkArray.removeAt(i);
            return;
          }
          i++;
        });
      }
    }
  
    cargara_mesas_nueva()
  {
   // this.ngxUiLoaderService.start();

    let _this=this;
    let usuario:any =  this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
   const token = usuario['Token'].toString();
   console.log(this.data);
   
  this.servicio.enviar_seguro('Web_service/buscar_mesas_agrupar',  {"idsilla":this.data["mesa_id"]}  , token,2).pipe().subscribe(
    (response:any)  =>  {
      _this.carga_inicial=true;
      _this.lista_datos=response;
     // this.ngxUiLoaderService.stop();

    });
  }

  submitForm()
  {
    console.log(this.form.value);
    this.text_boton="Guardando....";
    this.button_estado=false;
    let _this=this;
    let usuario:any =  this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
   const token = usuario['Token'].toString();
   console.log(this.data);
  this.servicio.enviar_seguro('Web_service/guardar_mesa_agrupar',  {"idsilla":this.data["mesa_id"],"mesanueva":this.form.value["arraymesas"]}  , token,2).pipe().subscribe(
    (response:any)  =>  {
      //_this.lista_datos=response;
      _this._snackBar.open(response["mensaje"],'',{
        duration: 2 * 1000,
      });
      _this.dialogRef.close(response);
    });
  }

}
