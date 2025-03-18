import {
  Component,
  OnInit,
  Renderer2,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../../servicio/authentication.service';
import { Servicio } from 'src/app/servicio/servicio';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-validar-asistencia',
  templateUrl: './validar-asistencia.component.html',
  styleUrls: ['./validar-asistencia.component.css'],
})
export class ValidarAsistenciaComponent implements OnInit, OnDestroy, AfterViewInit {
  dni: string = ''; // Modelo para el input de DNI
  mensaje: string = '';
  mensajeVencimiento: string = '';
  mensajeTrotadora: string = '';
  dias: string = '';
  nombre: string = '';
  fecha: string = '';
  fechaVencimiento: string = '';
  estado: string = ''; // Utilizado para manejar el color del card dinámicamente
  estadoVencimiento: string = '';
  diasRestantes: number = 0;
  nombreCliente = '';
  mostrarCardPrincipal: boolean = false; // Indica si mostrar el card principal
  mostrarCardRegistro: boolean = true; // Indica si mostrar el mensaje inicial
  isFullScreen: boolean = false; // Estado de pantalla completa

  @ViewChild('dniInput') dniInputElement!: ElementRef;
  resizeListener!: () => void;

  constructor(
    private renderer: Renderer2,
    private ngxUiLoaderService: NgxUiLoaderService,
    private _snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private servicio: Servicio
  ) {}

  ngOnInit(): void {
    this.resizeListener = this.renderer.listen('window', 'resize', () => {
      this.focusInput();
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.focusInput();
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.resizeListener) {
      this.resizeListener();
    }
  }
  // Detectar si el dispositivo es una tablet
  /*isTablet(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIPad = /ipad/.test(userAgent) || (/macintosh/.test(userAgent) && 'ontouchend' in document);
    const isAndroidTablet = /android/.test(userAgent) && !/mobile/.test(userAgent);
    return isIPad || isAndroidTablet;
  }*/
  onInputFocus(): void {
    const elem = document.getElementById('cardPrincipal');
    if (document.fullscreenElement) {
      elem?.requestFullscreen().catch((err) => {
        console.error(`Error al intentar mantener pantalla completa: ${err.message}`);
      });
    }
  }
  disableKeyboard(event: FocusEvent): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.readOnly = true; // Desactivar teclado virtual
    setTimeout(() => {
      inputElement.readOnly = false; // Permitir edición con teclado físico
    }, 100);
  }
  
  enableKeyboard(event: FocusEvent): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.readOnly = false; // Restaurar comportamiento normal al perder el foco
  }
  handleKeydown(event: KeyboardEvent): void {
    // Manejar eventos de teclado físico, como Enter o Tab
    if (event.key === 'Enter') {
      this.buscar();
    }
  }
  focusInput(): void {
    setTimeout(() => {
      const inputElement = document.getElementById('dni') as HTMLInputElement;
      if (inputElement) {
        inputElement.focus();
      }
    }, 0);
  }


  toggleFullScreen(): void {
    const elem = document.getElementById('cardPrincipal');

    if (!document.fullscreenElement) {
      elem?.requestFullscreen().then(() => {
        this.isFullScreen = true;
        elem?.classList.add('fullscreen');
        /*if (this.isTablet()) {
          // Agregar un retraso para evitar problemas de teclado en tablets
          setTimeout(() => this.focusInput(), 500);
        }*/
      }).catch((err) => {
        console.error(`Error al intentar entrar en pantalla completa: ${err.message}`);
      });
    } else {
      document.exitFullscreen().then(() => {
        this.isFullScreen = false;
        elem?.classList.remove('fullscreen');
      }).catch((err) => {
        console.error(`Error al salir de pantalla completa: ${err.message}`);
      });
    }
  }

  isValidDNI(dni: string): boolean {
    const dniRegex = /^[0-9]{8}$/;
    return dniRegex.test(dni);
  }

  onKeyPress(event: KeyboardEvent): void {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  buscar(): void {
    this.ngxUiLoaderService.start();
    let _this = this;

    if (!this.isValidDNI(this.dni)) {
      this._snackBar.open('Por favor ingrese un DNI válido de 8 dígitos', '', {
        duration: 2000,
      });
      return;
    }

    let usuario: any = this.authenticationService.currentUserValue;
    const token = usuario['Token'].toString();

    this.servicio
      .enviar_seguro('Membresias/registrar_asistencia', { dni: this.dni }, token, 2)
      .subscribe(
        (response: any) => {
          console.log('Respuesta:', response);
          _this.ngxUiLoaderService.stop();
          this.mensaje = response.mensaje || 'No tiene datos';
          this.mensajeVencimiento = response.mensajeVencimiento || '';
          this.mensajeTrotadora = response.mensajeTrotadora || '';
          this.nombre = response.nombre || '';
          this.fecha = response.fecha || '';
          this.fechaVencimiento = response.fechaVencimiento || '';
          this.diasRestantes = response.diasRestantes || 0;
          this.estado = response.estado || 'error';
          this.estadoVencimiento = response.estadoVencimiento || 'error';
          this.nombreCliente = response.nombre || '';
          this.dni = '';
          this.mostrarCardPrincipal = true;
          this.mostrarCardRegistro = false;
          if (this.diasRestantes===0) {
            const warningAudio = new Audio('assets/sounds/sfx-menu21.mp3');
            warningAudio.play();
          }
          setTimeout(() => {
            this.limpiarDatos();
          }, 20000);

          this._snackBar.open('Ingreso Satisfactorio', 'MR. FIT LE DESEA UN BUEN DÍA', {
            duration: 2000,
          });
        },
        (error) => {
          _this.ngxUiLoaderService.stop();
          console.error('Error:', error);
          this._snackBar.open('Error al cargar los datos', '', {
            duration: 2000,
          });
        }
      );
  }

  limpiarDatos(): void {
    this.mensaje = '';
    this.mensajeVencimiento = '';
    this.mensajeTrotadora = '';
    this.nombre = '';
    this.fecha = '';
    this.fechaVencimiento = '';
    this.diasRestantes = 0;
    this.estado = '';
    this.nombreCliente = '';
    this.mostrarCardPrincipal = false;
    this.mostrarCardRegistro = true;
  }
}