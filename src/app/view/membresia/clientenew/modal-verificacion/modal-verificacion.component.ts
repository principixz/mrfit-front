import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationService } from 'src/app/servicio';
import { Servicio } from 'src/app/servicio/servicio';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-verificacion',
  templateUrl: './modal-verificacion.component.html',
  styleUrls: ['./modal-verificacion.component.css']
})
export class ModalVerificacionComponent {
  form: FormGroup;
  texto_boton="Guardar";
  errorMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private ngxUiLoaderService: NgxUiLoaderService,
    private authenticationService: AuthenticationService,
    private servicio:Servicio,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ModalVerificacionComponent>
  ) {
    this.form = this.fb.group({
      usuario: ['', [Validators.required]],
      clave: ['', [Validators.required]],
      motivo: ['', [Validators.required]],
    });
  }

  onCancel(): void {

    this.dialogRef.close(null); // Cerrar modal sin datos
  }

  onSubmit(): void {
    if (this.form.valid) {
      let _this=this;
      this.ngxUiLoaderService.start();
      let datos =  {};
      _this.texto_boton="Guardando...";
      datos = this.form.value;
      const user:any  = this.authenticationService.currentUserValue;
      const token = user['Token'];
      let panelClass = '';
      this.servicio.enviar_seguro('Membresias/consultarCredenciales', datos , token).pipe().subscribe(
        (response:any)  =>  { 
          this.ngxUiLoaderService.stop(); 
          if (response.status) {
            this.dialogRef.close(response);
            _this.errorMessage = response["message"]
            panelClass = 'success-snackbar';
          } else {
            _this.texto_boton="Guardar";
            panelClass = 'error-snackbar'
            this.errorMessage = response.message || 'Credenciales inválidas. Inténtelo nuevamente.';
          }
          
          _this._snackBar.open(_this.errorMessage,'',{
            duration: 2000,
            panelClass: [panelClass],
          });
        },
        (error) =>  {
          panelClass = 'error-snackbar';
          _this._snackBar.open(_this.errorMessage,'',{
            duration: 2000,
            panelClass: [panelClass],
          });
          _this._snackBar.open(_this.errorMessage,'',{
            duration: 2 * 1000,
          });
          this.ngxUiLoaderService.stop();
        },
      );
       // Retorna los datos del formulario
    }
  }
}