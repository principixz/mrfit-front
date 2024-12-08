import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Servicio } from '../../../../servicio/servicio';
import { AuthenticationService } from '../../../../servicio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParamMap  } from '@angular/router';
import { Subscription } from 'rxjs';


function fechaFinPosteriorAFechaInicio(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const fechaInicio = group.get('fecha_inicio')?.value;
    const fechaFin = group.get('fecha_fin')?.value;
    if (fechaInicio && fechaFin && fechaFin < fechaInicio) {
      return { fechaFinAnteriorAFechaInicio: true };
    }
    return null;
  };
}


@Component({
  selector: 'app-nuevamembresia',
  templateUrl: './nuevamembresia.component.html',
  styleUrls: ['./nuevamembresia.component.css']
})
export class NuevamembresiaComponent implements OnInit, OnDestroy {
  form: FormGroup;
  texto_boton = 'Guardar';
  estado = true;
  titulo = 'Editar Tipo Membresia'
  duracionLabel: string = 'Meses'; // Variable para el label dinámico
  isEditMode: boolean = false;

  // Variables para opciones
  tipoPeriodo = [
    { value: '01', label: 'Ilimitado' },
    { value: '02', label: 'Temporal' }
  ];

  tipoDurabilidad = [
    { value: '01' , label : 'Diario'},
    { value: '02' , label : 'Mensual'},
    { value: '03' , label : 'Anual'}
  ]

  categoriaMembresia = [
    { value: '01', label: 'Individual' },
    { value: '02', label: 'Grupal' }
  ];
  tipoDurabilidadSubscription: Subscription | null = null;
  tipoPeriodoSubscription:  Subscription | null = null;
  categoriaMembresiaSubscription: Subscription | null = null;
  minDate: string;

  constructor(
    private fb: FormBuilder,
    private servicio: Servicio,
    private router: Router,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) {
    this.form = this.fb.group({
      id: [''],
      descripcion: ['', Validators.required],
      precio_mensual: ['', Validators.required],
      meses: [1, Validators.required],
      tipo_periodo: ['01'],
      tipo_durabilidad: ['01'],
      fecha_inicio: [{ value: '', disabled: true }, Validators.required],
      fecha_fin: [{ value: '', disabled: true }, Validators.required],
      categoria_membresia: ['01'],
      cantidad_personas: [1],
      estado: ['1', Validators.required]
    }, { validators: fechaFinPosteriorAFechaInicio() });
    this.minDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let _this=this;
      let usuario:any =  this.authenticationService.currentUserValue;
      console.log(usuario['Token']);
      const token = usuario['Token'].toString();
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.texto_boton = 'Actualizar';
        this.titulo = 'Editar Tipo Membresia';
        this.route.paramMap.subscribe((params: ParamMap)  => {
          if  (params.get('id') !=  null  ) {
            _this.form.get('id')!.setValue(params.get('id'));
            _this.servicio.enviar_seguro('Membresias/get_membresia', {  'id':  params.get('id')  },  token).pipe().subscribe(
              (response:any) =>  {
                console.log(response)
                _this.form.get('descripcion')!.setValue(response['tipomembresia'][0]['tipo_membresia_descripcion']);
                _this.form.get('precio_mensual')!.setValue(response['tipomembresia'][0]['tipo_membresia_precio_mes']);
                _this.form.get('tipo_durabilidad')!.setValue(response['tipomembresia'][0]['tipo_membresia_tipopago']);
                
                // Asignaciones corregidas
                _this.form.get('tipo_periodo')!.setValue(response['tipomembresia'][0]['tipo_membresia_tipoperiodo']);
                _this.form.get('fecha_inicio')!.setValue(new Date(response['tipomembresia'][0]['tipo_membresia_fechainicio'] + 'T00:00:00'));
                _this.form.get('fecha_fin')!.setValue(new Date(response['tipomembresia'][0]['tipo_membresia_fechafin'] + 'T00:00:00'));
                _this.form.get('categoria_membresia')!.setValue(response['tipomembresia'][0]['tipo_membresia_categoriamembresia']);
                _this.form.get('cantidad_personas')!.setValue(response['tipomembresia'][0]['tipo_membresia_cantidadpersona']);
  
                // Llamar a las funciones de actualización
                _this.verificar();
                _this.estadocategoria();
                _this.verificarDurabilidad();
                

                
                //this.ngxUiLoaderService.stop();
              },  (error)  =>  {
                console.error(error);
                },
              );

          }});
      }else{
        this.isEditMode = false;
        this.texto_boton = 'Guardar';
        this.titulo = 'Crear Nueva Membresía';
      }
    });

        // Suscribirse a los cambios de 'tipo_durabilidad'
    this.tipoDurabilidadSubscription = this.form.get('tipo_durabilidad')!.valueChanges.subscribe(() => {
      this.verificarDurabilidad();
    });
    this.tipoPeriodoSubscription = this.form.get('tipo_periodo')!.valueChanges.subscribe(() =>{
      this.verificar();
    });
    this.categoriaMembresiaSubscription = this.form.get('categoria_membresia')!.valueChanges.subscribe(() => {
      this.estadocategoria();
    });

    this.estadocategoria();
    this.verificar();
    this.verificarDurabilidad();
  }

  ngOnDestroy(): void {
    if (this.tipoDurabilidadSubscription) {
      this.tipoDurabilidadSubscription.unsubscribe();
    }
    if (this.categoriaMembresiaSubscription) {
      this.categoriaMembresiaSubscription.unsubscribe();
    }
    if (this.tipoPeriodoSubscription) {
      this.tipoPeriodoSubscription.unsubscribe();
    }
  }
  verificar(): void {
    if (this.form.get('tipo_periodo')!.value === '02') { // Temporal
      this.form.get('fecha_inicio')!.enable();
      this.form.get('fecha_fin')!.enable();
      this.form.get('fecha_inicio')!.setValidators([Validators.required]);
      this.form.get('fecha_fin')!.setValidators([Validators.required]);
      //this.form.get('fecha_inicio')!.updateValueAndValidity();
      //this.form.get('fecha_fin')!.updateValueAndValidity();
    } else {
      this.form.get('fecha_inicio')!.disable();
      this.form.get('fecha_fin')!.disable();
      this.form.get('fecha_inicio')!.clearValidators();
      this.form.get('fecha_fin')!.clearValidators();
      //this.form.get('fecha_inicio')!.updateValueAndValidity();
      //this.form.get('fecha_fin')!.updateValueAndValidity();
    }
  }

  verificarDurabilidad(): void {
    switch (this.form.get('tipo_durabilidad')!.value) {
      case '01': // Diario
        this.duracionLabel = 'Días';
        break;
      case '02': // Mensual
        this.duracionLabel = 'Meses';
        break;
      case '03': // Anual
        this.duracionLabel = 'Años';
        break;
      default:
        this.duracionLabel = 'Duración';
        break;
    }
  }

  validateDecimal(event: KeyboardEvent) {
    const pattern = /[0-9\.]/;
    const inputChar = String.fromCharCode(event.charCode);

    // Permitir teclas especiales como Backspace y Delete
    if (event.keyCode === 8 || event.keyCode === 46) {
      return;
    }

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    } else {
      const currentInput = (event.target as HTMLInputElement).value;
      const selectionStart = (event.target as HTMLInputElement).selectionStart || 0;
      const selectionEnd = (event.target as HTMLInputElement).selectionEnd || 0;

      // Obtener el nuevo valor si se permite el carácter
      const newValue =
        currentInput.substring(0, selectionStart) +
        inputChar +
        currentInput.substring(selectionEnd);

      // Validar que solo haya un punto decimal
      if (inputChar === '.' && currentInput.includes('.')) {
        event.preventDefault();
      }

      // Validar que solo haya hasta dos decimales
      const decimalIndex = newValue.indexOf('.');
      if (decimalIndex >= 0 && newValue.substring(decimalIndex + 1).length > 2) {
        event.preventDefault();
      }
    }
  }

  formatDecimal(controlName: string) {
    let value = this.form.get(controlName)?.value;
    if (value) {
      // Convertir el valor a número y formatear con dos decimales
      value = parseFloat(value).toFixed(2);
      this.form.get(controlName)?.setValue(value);
    }
  }

  estadocategoria(): void {
    if (this.form.get('categoria_membresia')!.value === '02') { // '02' para 'Grupal'
      this.form.get('cantidad_personas')!.enable();
      this.form.get('cantidad_personas')!.setValidators([Validators.required, Validators.min(2)]);
      this.form.get('cantidad_personas')!.updateValueAndValidity();
    } else {
      this.form.get('cantidad_personas')!.disable();
      this.form.get('cantidad_personas')!.clearValidators();
      this.form.get('cantidad_personas')!.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const usuario: any = this.authenticationService.currentUserValue;
      const token = usuario['Token'].toString();
      this.texto_boton = 'Guardando...';
      this.estado = false;
      let endpoint = '';
      let successMessage = '';
      if (this.isEditMode) {
          endpoint = 'Membresias/put_registrartipomembresia';
          successMessage = 'Servicio actualizado correctamente.';
      } else {
          endpoint = 'Membresias/post_registrartipomembresia';
          successMessage = 'Servicio insertado correctamente.';
      }
      this.servicio
        .enviar_seguro(endpoint, this.form.value, token)
        .subscribe(
          (response: any) => {
            this.snackBar.open(response.mensaje, '', { duration: 2000 });
            this.router.navigate(['/principal/membresia/tipo_membresia/lista']);
          },
          (error) => {
            console.error(error);
            this.texto_boton = 'Guardar';
            this.estado = true;
          }
        );
    }
  }
}