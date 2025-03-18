import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Servicio } from 'src/app/servicio/servicio'; 
import {MatSnackBar} from '@angular/material/snack-bar';
import { ParamMap  } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AlertService, AuthenticationService } from 'src/app/servicio';
import { ModalVerificacionComponent } from '../modal-verificacion/modal-verificacion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-first-tab',
  templateUrl: './first-tab.component.html',
  styleUrls: ['./first-tab.component.css']
})
export class FirstTabComponent implements OnInit {
  form: FormGroup;
  tiposMembresia: TipoMembresia[] = [];
  habilitarFechaFin:boolean = false;   
  titulo="";
  tipo_movimiento:any[]=[]
  texto_boton="Guardar";
  estado=true;
  idEmpleado: any = '';
  motivoCambio : string = '';
  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private loadingBar: LoadingBarService,
    private authenticationService: AuthenticationService,
    private ngxUiLoaderService: NgxUiLoaderService,
     private alertService: AlertService,
     private route: ActivatedRoute,
     private router: Router,
     private servicio:Servicio,
     public formbuilder:FormBuilder,
     private activatedroute:ActivatedRoute
  ) { 


    this.form = this.formbuilder.group({
         id: ['',[   ]],
         dni: ['',[      Validators.required,
          Validators.pattern(/^\d{8}$|^\d{11}$/)  ]],
         nombres: ['',[    Validators.required, ]],
         direccion: ['',[     ]],
         correo: ['',[   ]],
         telefono: ['',[   ]],
         fechaFinMembresia: ['', []], 
         tipoMembresia: ['', [Validators.required]],
         habilitarFechaFin: [false] // Valor inicial del checkbox    
    },{
      validators: this.validateFechaFinMembresia() // Añade una validación personalizada
    });

  }
  ngOnInit(): void {

    let _this=this;
    let usuario:any =  this.authenticationService.currentUserValue;
    console.log(usuario['Token']);
   const token = usuario['Token'].toString();
   console.log("info.....");
   this.activatedroute.data.subscribe(data => {   
    _this.titulo=data["title"];
    })
  
    this.servicio
      .enviar_seguro('Membresias/get_membresia', {}, token)
      .subscribe(
        (response: any) => {
          console.log(response.tipomembresia);
          if (response && response.tipomembresia) {
            // Mapear los datos recibidos al formato esperado
            this.tiposMembresia = response.tipomembresia.map((item: any) => ({
              id: item.id, // ID del servicio
              nombre: `${item.nombre_servicio}`, // Combina nombre y precio
            }));
          }
        },
        (error) => {
          console.error('Error al obtener tipos de membresía:', error);
        }
      );


        this.route.paramMap.subscribe((params: ParamMap)  => {
          
          if  (params.get('id') !=  null  ) {
            this.ngxUiLoaderService.start();
            _this.form.get('id')!.setValue(params.get('id'));
            _this.servicio.enviar_seguro('web_service/cargar_cliente_uno', {  'id':  params.get('id')  },  token).pipe().subscribe(
              (response:any) =>  {
              _this.form.get('nombres')!.setValue(response['cliente_nombres']);
              _this.form.get('dni')!.setValue(response['cliente_dni']);
              _this.form.get('telefono')!.setValue(response['cliente_telefono']);
              _this.form.get('direccion')!.setValue(response['cliente_direccion']);
              _this.form.get('correo')!.setValue(response['cliente_email']);
              const fechaFinMembresia = response['fechaFinMembresia']; // "2025-01-01"
              if (fechaFinMembresia) {
                const fecha = new Date(fechaFinMembresia + 'T00:00:00'); 
                _this.form.get('fechaFinMembresia')!.setValue(fecha);
              }
              this.habilitarFechaFin =  response.cliente_estado_fechavencimiento === "1" ? true : false;
              _this.form.get('habilitarFechaFin')!.setValue(response.cliente_estado_fechavencimiento === "1" ? true : false);
              _this.form.get('tipoMembresia')!.setValue(response['cliente_tipomembresia']);
                this.ngxUiLoaderService.stop();
              },  (error)  =>  {
                 this.ngxUiLoaderService.stop();
                },
              );

          }});
  }

  validateFechaFinMembresia() {
    return (formGroup: FormGroup) => {
      const habilitarFechaFin = formGroup.get('habilitarFechaFin')?.value;
      const fechaFinMembresia = formGroup.get('fechaFinMembresia');
  
      if (habilitarFechaFin && !fechaFinMembresia?.value) {
        fechaFinMembresia?.setErrors({ required: true });
      } else {
        fechaFinMembresia?.setErrors(null);
      }
    };
  }
  toggleFechaFin() {
    const control = this.form.get('habilitarFechaFin');
    if (control) {
      this.habilitarFechaFin = !this.habilitarFechaFin;
      this.form.get('habilitarFechaFin')!.setValue(this.habilitarFechaFin); 
    }
  }

  onSubmit() {
    let _this=this;
    if ( this.form.valid ) {
      this.ngxUiLoaderService.start(); 
      _this.texto_boton="Guardando...";
      _this.estado=false;
      let datos = {
        ...this.form.value, // Copia los valores del formulario
        motivoCambio: this.motivoCambio, // Agrega motivoCambio
        idEmpleado: this.idEmpleado, // Agrega idEmpleado
      };
      const user:any  = this.authenticationService.currentUserValue;
      // tslint:disable-next-line: no-string-literal
      const token = user['Token'];
      this.servicio.enviar_seguro('Membresias/gestionar_cliente', datos , token).pipe().subscribe(
        (response:any)  =>  {
          _this._snackBar.open(response["mensaje"],'',{
            duration: 2 * 1000,
          });
          this.ngxUiLoaderService.stop();
          this.router.navigate(['/principal/membresia/clientes']);
         // }
        },
        (error) =>  {
          this.ngxUiLoaderService.stop();
        },
      );
   }
  }


  openModal(): void {
    const dialogRef = this.dialog.open(ModalVerificacionComponent, {
      width: '600px',
      disableClose: true,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.motivoCambio = result.motivo
        this.idEmpleado = result.data.empleado_id
        this.onSubmit();
        // Aquí puedes manejar los datos y procesar la acción
      } else {
        console.log('Modal cancelado');
      }
    });
  }

  buscarCliente(): void {
    const dniControl = this.form.get('dni');
    const dni = dniControl?.value;
    let _this=this;
    
    if (dni && (dni.length === 8 || dni.length === 11)) {
      const usuario: any = this.authenticationService.currentUserValue;
      const token = usuario['Token'].toString();
      this.ngxUiLoaderService.start(); 
      this.servicio
        .enviar_seguro('web_service/cargar_cliente_uno', { dni: dni }, token)
        .subscribe(
          (response: any) => {
            this.ngxUiLoaderService.stop();
            if (response) {
              // Llenar los campos con los valores recibidos
              _this.form.get('id')!.setValue(response['id']);
              _this.form.get('nombres')!.setValue(response['cliente_nombres']);
              _this.form.get('dni')!.setValue(response['cliente_dni']);
              _this.form.get('telefono')!.setValue(response['cliente_telefono']);
              _this.form.get('direccion')!.setValue(response['cliente_direccion']);
              _this.form.get('correo')!.setValue(response['cliente_email']);
              const fechaFinMembresia = response['fechaFinMembresia']; // "2025-01-01"
              if (fechaFinMembresia) {
                const fecha = new Date(fechaFinMembresia + 'T00:00:00'); 
                _this.form.get('fechaFinMembresia')!.setValue(fecha);
              }
              this.habilitarFechaFin =  response.cliente_estado_fechavencimiento === "1" ? true : false;
              _this.form.get('habilitarFechaFin')!.setValue(response.cliente_estado_fechavencimiento === "1" ? true : false);
              _this.form.get('tipoMembresia')!.setValue(response['cliente_tipomembresia']);
            } else {
              // Si no se encuentra el cliente, limpiar los campos excepto el DNI
              _this.form.get('id')!.setValue('');
              _this.form.get('nombres')!.setValue('');
              
              _this.form.get('telefono')!.setValue('');
              _this.form.get('direccion')!.setValue('');
              _this.form.get('correo')!.setValue('');
              _this.form.get('habilitarFechaFin')!.setValue(false)
              _this.form.get('tipoMembresia')!.setValue(1);
            }
            _this.form.get('dni')!.setValue(dni);
          },
          (error) => { 
            console.error('Error al buscar cliente:', error);
            this.ngxUiLoaderService.stop();
            // En caso de error, limpiar los campos excepto el DNI
            this.form.patchValue({
              nombres: '',
              direccion: '',
              correo: '',
              telefono: '',
              tipoMembresia: '',
              fechaFinMembresia: null,
              habilitarFechaFin: false
            });
          }
        );
    }
    
  }

}

interface TipoMembresia {
  id: string;
  nombre: string;
}