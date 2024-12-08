import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../../servicio/authentication.service';
import { Servicio } from 'src/app/servicio/servicio';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-validar-asistencia',
  templateUrl: './validar-asistencia.component.html',
  styleUrls: ['./validar-asistencia.component.css'],
})
export class ValidarAsistenciaComponent implements OnInit {
  dni: string = ''; // Modelo para el input de DNI
  mensaje: string = '';
  mensajeVencimiento: string = '';
  dias: string = '';
  nombre: string = '';
  fecha: string = '';
  fechaVencimiento: string = '';
  estado: string = ''; // Utilizado para manejar el color del card dinámicamente
  diasRestantes: number = 0;
  nombreCliente = '';
  constructor(
    private ngxUiLoaderService: NgxUiLoaderService,
    private _snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private servicio: Servicio // Utilizar `Servicio` para `enviar_seguro`
  ) {}

  ngOnInit(): void {}

  // Método para validar el DNI
  isValidDNI(dni: string): boolean {
    const dniRegex = /^[0-9]{8}$/;
    return dniRegex.test(dni);
  }

  // Método para manejar eventos de tecla
  onKeyPress(event: KeyboardEvent): void {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  buscar(): void {
    this.ngxUiLoaderService.start();
    let _this = this;
    // Validación del DNI
    if (!this.isValidDNI(this.dni)) {
      this._snackBar.open('Por favor ingrese un DNI válido de 8 dígitos', '', {
        duration: 2000,
      });
      return;
    }

    let usuario: any = this.authenticationService.currentUserValue;
    const token = usuario['Token'].toString();
 
    // Utilizar `enviar_seguro` para la solicitud
    this.servicio
      .enviar_seguro('Membresias/registrar_asistencia', { dni: this.dni }, token, 2)
      .subscribe(
        (response: any) => {
          console.log('Respuesta:', response);
          _this.ngxUiLoaderService.stop();
          // Actualizar las variables con los datos recibidos
          this.mensaje = response.mensaje || 'No tiene datos';
          this.mensajeVencimiento = response.mensajeVencimiento || '';
          this.nombre = response.nombre || '';
          this.fecha = response.fecha || '';
          this.fechaVencimiento = response.fechaVencimiento || '';
          this.diasRestantes = response.diasRestantes || 0;
          this.estado = response.estado || 'error'; // Manejar color del card dinámicamente
          this.nombreCliente = response.nombre || '';
          this.dni = '';
          // Mostrar mensaje basado en la respuesta
          this._snackBar.open(this.mensaje, '', {
            duration: 2000,
          });
        },
        (error) => {
          console.error('Error:', error);
          this._snackBar.open('Error al cargar los datos', '', {
            duration: 2000,
          });
        }
      );
  }
}