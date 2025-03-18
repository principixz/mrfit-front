import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit,ViewChild,ElementRef,EventEmitter,Input,ViewEncapsulation    } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DEFAULT_OPTIONS,MatDialogConfig} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/servicio';
import { Servicio } from 'src/app/servicio/servicio';

@Component({
    selector: 'dialog-modal-cliente',
    templateUrl: 'nuevocliente.component.html',
   
   
  })
export class NuevoClienteModal implements OnInit {
  form: FormGroup; 
  tipocliente:any=[];
    ngOnInit(): void {
       let _this=this;
       let usuario:any =  this.authenticationService.currentUserValue;
      //  console.log(usuario['Token']);
       const token = usuario['Token'].toString();

       _this.servicio.enviar_seguro('web_service/ws_cargar_tipo_documento', {   },  token).pipe().subscribe(
        (response:any) =>  {
          _this.tipocliente=response;
      
        },  (error)  =>  {
           
          },
        );
       
      }
      constructor( public modal: NgbActiveModal, public formbuilder:FormBuilder,private modalService: NgbModal, private ngxUiLoaderService:NgxUiLoaderService,
        public dialog: MatDialog,
       private _snackBar: MatSnackBar,private route: ActivatedRoute,
        private router: Router,
      private authenticationService: AuthenticationService,public servicio:Servicio
      ) {

        this.form = this.formbuilder.group({
          tipo_documento: ['',[   Validators.required,]],
             id: ['',[   ]],
             numero_documento: ['',[   Validators.required,]],
             razon_social: ['',[   Validators.required,]],
             celular: ['',[ ]],
             direccion: ['',[  ]],
             correo:[]



        
        });


      }
    

      texto_boton="Guardar";
      estado=false;
      onSubmit(){

        let _this=this;
        if ( this.form.valid ) {
        //  this.ngxUiLoaderService.start();
          let datos =  {};
          _this.texto_boton="Guardando...";
          _this.estado=true;
          datos = this.form.value;
          const user:any  = this.authenticationService.currentUserValue;
          // tslint:disable-next-line: no-string-literal
          const token = user['Token'];
          this.servicio.enviar_seguro('web_service/ws_guardar_cliente', datos , token).pipe().subscribe(
            (response:any)  =>  {
              _this.texto_boton="Guardar";
              _this.estado=false;
               if(response["estado"]){
                _this.modal.close();
               }
               _this._snackBar.open(response["mensaje"],'',{
                duration: 2 * 1000,
              });
            },
            (error) =>  {
              _this.texto_boton="Guardar";
              _this.estado=false;
              //this.ngxUiLoaderService.stop();
            },
          );
       }
      }



      botonname:String="Buscar";
   buscarreniec() {
    const user:any  = this.authenticationService.currentUserValue;
    const dat = user['Token'];
    const valform = (this.form.value);
    const tipodoc  = Number(this.form.get('tipodoc')?.value);
    let urlv = '';
    console.log(tipodoc);
    if ( tipodoc === 1 ) {
       urlv = 'consultarreniec'; 
    } else {
      if ( tipodoc === 2 ) {
        urlv = 'consultaRUC'; 
      }
    }
    
    if ( tipodoc === 3 ) { 
      return false;
    }
    this.botonname = 'Buscando...';
    this.servicio.enviar_seguro('web_service/' + urlv,  { 'formulario' : valform } , dat).pipe().subscribe(
      (response:any)  =>  {
        this.ngxUiLoaderService.stop();
        const datos = (JSON.parse(response['datos']));
        // console.log(response['sucess'] );
        if  (datos['success']) {
            this.botonname = 'Consultar';
            const data = datos['result'];
            if ( tipodoc === 1 ) {
              const nombre = data['paterno'] + ' ' + data['materno'] + ', ' + data['nombre'] ;
              this.form.get('cliente_nombre')!.setValue(nombre);
            }
            if ( tipodoc === 2 ) {
              const direccion = data['direccion'] ;
              const nombre = data['razon_social'] ;
              this.form.get('cliente_nombre')!.setValue(nombre);
              this.form.get('cliente_direccion')!.setValue(direccion);
            }
 
          } else {
           /* this.botonname = 'Consultar';
            this.toastr.error( 'No se encontro el documento solicitado', 'No existe documento', {
              closeButton: false,
              positionClass: 'toast-bottom-right',
            });*/
          }
      },
      (error) => {
        /*this.toastr.error( 'Error al consultar', 'Error', {
          closeButton: false,
          positionClass: 'toast-bottom-right',
        });*/
        this.botonname = 'Buscar';
      },
    );

    return;
  }
}