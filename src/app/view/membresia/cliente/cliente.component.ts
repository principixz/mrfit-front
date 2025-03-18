
import { Component, ViewChild,OnInit } from '@angular/core';
import { SimpleNotificationsComponent } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
import { MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';

import {MatSort} from '@angular/material/sort';
import{MatPaginator} from '@angular/material/paginator';
import{Servicio} from '.././../../servicio/servicio';
import { AlertService, AuthenticationService } from '../../../servicio';


import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import swal from 'sweetalert2';

import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

class DataTablesResponse {
  data: any[] | undefined;
  draw: number | undefined;
  recordsFiltered: number | undefined;
  recordsTotal: number | undefined;
}

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  public datatable!: DataTableDirective;

  public dtOptions: DataTables.Settings = {  };
  public listaasociado:any;
  public asociado:any; 
  isLoading: boolean = false;
  public dtTrigger: Subject<any> = new Subject();
  asociados:any[]=[];
  ngOnInit(): void {
    let _this = this;
         
    this.dtOptions = {
      language: {
        processing: 'Procesando...',
        search: 'Buscar:',
      // tslint:disable-next-line: object-literal-sort-keys
      lengthMenu: 'Mostrar _MENU_ elementos',
      info: 'Mostrando desde _START_ al _END_ de _TOTAL_ elementos',
      infoEmpty: 'Mostrando ningún elemento.',
      infoFiltered: '(filtrado _MAX_ elementos total)',
      infoPostFix: '',
      loadingRecords: 'Cargando registros...',
     // zeroRecords: 'No se encontraron registros',
      emptyTable: 'No hay datos disponibles en la tabla',
      paginate: {
        first: 'Primero',
        previous: 'Anterior',
        // tslint:disable-next-line: object-literal-sort-keys
        next: 'Siguiente',
        last: 'Último',
      },
      aria: {
        sortAscending: ': Activar para ordenar la tabla en orden ascendente',
        sortDescending: ': Activar para ordenar la tabla en orden descendente',
      },
      },
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      
      ajax: (dataTablesParameters: any, callback) => {
        let usuario: any = this.authenticationService.currentUserValue;
        // tslint:disable-next-line: no-string-literal
       const dat = usuario['Token'];
       const httpOptions = {
        headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': dat,
  
        }),
      };
        
        _this.http
          .post<DataTablesResponse>(
            _this.conexion.url_global+'Membresias/buscar_tabla_clientes',
            dataTablesParameters, httpOptions 
          ).subscribe(resp => {
            //that.persons = resp.data;
            _this.asociado=resp.data;
            console.log(_this.asociado);
            // this.dtTrigger.next();
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        { data: 'id' }, 
      { data: 'dni' }, 
      {data : 'nombre'},
      { data: 'membresia' }, 
      { data: 'fecha_vencimiento' }, 
      { data: 'estado_opcion' },
      { data: 'button' }
    ]
    };
    
  }

  //dtOptions: DataTables.Settings = {};
  //persons: Person[];

  editarboton(id = null) { 
    if(id != null){
      this.router.navigate(['/principal/membresia/clientes/editar/' + id]);
    }else{
      this.router.navigate(['principal/membresia/clientes/nuevo']);
    }
    
  }
  constructor(private http: HttpClient, private conexion: Servicio, public datos: AuthenticationService,   private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  public ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  descargar_pdf(url:any){
    let url1=url.replace("http://", "https://");
    window.open(url1);

  }
  enviar_correo(id:any){
    Swal.fire({
      title: 'Ingrese el correo electrónico',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        var payload = {
          "id": id,
          "correo": login
      };
      
        return fetch(this.conexion.url_global+'Api/ws_enviar_factura',{
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire(
          'Excelente',
          'Se envio correctamente el correo',
          'success'
        );
       /* Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        })*/
      }
    })
   //alert(id);
  }

  imprimir_comprobante(id:any)
  {
    var url=this.conexion.url_global+"Comprobante/mostrar_comprobante/"+id;
    var a = document.createElement("a");
    a.target = "_blank";
    a.href = url;
    a.click();
  }
  eliminar_comprobante(id:any)
  {
  let _this=this; 

   Swal.fire({
      title: 'Ingrese motivo de eliminación',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        var payload = {
          "id": id,
          "mensaje": login
      };
      
      let usuario: any = this.authenticationService.currentUserValue;
        // tslint:disable-next-line: no-string-literal
       const dat = usuario['Token'];
        return fetch(this.conexion.url_global+'web_service/eliminar_cliente',{
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json',
            'Authorization': dat,
          },
          body: JSON.stringify(payload)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
  let dat= _this.asociado.findIndex((aso:any)=>aso.id==id);

  _this.asociado[dat].estado='0';
        Swal.fire(
          'Excelente',
          'Se elimino correctamente',
          'success'
        );
       /* Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        })*/
      }
    })
  }


  enviar_wtp(id:any){
    Swal.fire({
      title: 'Ingrese el número de celular',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        var payload = {
          "id": id,
          "numero": login
      };
      
        return fetch(this.conexion.url_global+'Api/enviar_whatsapp',{
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire(
          'Excelente',
          'Se envio correctamente el correo',
          'success'
        );
       /* Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        })*/
      }
    })
   //alert(id);
  }

  renovarMembresia(id: any, nombreCliente: string, documentoDni : string, tipomembresiaid: string): void {
    if (this.isLoading) return;
    this.isLoading = true;
    const usuario: any = this.authenticationService.currentUserValue;
    const token = usuario['Token'];
  
    this.conexion
      .enviar_seguro(`Membresias/get_renewmembresia`, { id: id }, token)
      .subscribe(
        (response: any) => {
          this.isLoading = false;
          if (response && response.data) {
            const { tiposMembresia, tarjetas, precio, fechaFin } = response.data;
            const today = new Date(); // Obtiene la fecha actual
            const peruOffset = -5; // UTC-5
            const fechaFinDate = new Date(fechaFin); // Convierte fechaFin a un objeto Date
            
            // Ajusta la fecha actual a la hora de Perú (UTC-5)
            const peruTime = new Date(today.getTime() + (peruOffset - today.getTimezoneOffset() / 60) * 3600000);
            
            // Compara la fechaFin con la hora actual en Perú
            const fechaInicioFormateada = fechaFinDate < peruTime
              ? peruTime.toISOString().split('T')[0] // Usa la fecha actual en Perú si fechaFin es menor
              : fechaFinDate.toISOString().split('T')[0];
              
            let fechaFinCalculada = fechaInicioFormateada;
            Swal.fire({
              width: '60%',
              title: `Renovar Membresía ${nombreCliente}`,
              html: `
                <form id="renovarMembresiaForm"> 
                  <div class="row">

                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="tipoDocumento">Tipo de Comprobante</label>
                        <select id="tipoDocumento" class="form-control">
                          <option value="6" selected>SIN DOCUMENTO</option>
                          <option value="2">BOLETA ELECTRONICA</option>
                          <option value="1">FACTURA ELECTRONICA</option>
                        </select>
                      </div>
                    </div>  

                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="documentoidentidad">RUC / DNI</label>
                        <input type="text" id="documentoidentidad" class="form-control" value="00000001">
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="razonsocial">NOMBRE Y APELLIDO / RAZÓN SOCIAL</label>
                        <input type="text" id="razonsocial" class="form-control" value="Cliente Varios">
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="tipoMembresia">Tipo de Membresía</label>
                        <select id="tipoMembresia" class="form-control">
                          ${tiposMembresia
                            .map(
                              (tipo: any) =>
                                `<option value="${tipo.id}" data-tipopago="${tipo.tipo_pago}" data-precio="${tipo.precio_servicio}" ${
                                  tipo.id === tipomembresiaid ? 'selected' : ''
                                }>
                                  ${tipo.nombre_servicio}
                                </option>`
                            )
                            .join('')}
                        </select>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="precio">Precio</label>
                        <input type="text" id="precio" class="form-control" value="${tiposMembresia[0].precio_servicio}" disabled>
                      </div>
                    </div>
                    

                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="cantidadMeses">Cantidad de Meses</label>
                        <input type="number" id="cantidadMeses" class="form-control" min="1" max="12" value="1">
                      </div>
                    </div>

                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="fechaInicio">Fecha de Inicio</label>
                        <input type="date" id="fechaInicio" class="form-control" value="${fechaInicioFormateada}" min="${fechaInicioFormateada}">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="fechaFin">Fecha de Fin</label>
                        <input type="text" id="fechaFin" class="form-control" value="${fechaFinCalculada}" disabled>
                      </div>
                    </div>
                  </div> 


                  <div class="row">
                    <div class="col-md-12">
                      <div id="formasDePagoContainer">
                        <div class="form-group">
                          <label>Forma de Pago</label>
                          <div class="input-group mb-2">
                            <select class="form-control pago-tipo">
                              ${tarjetas
                                .map(
                                  (tarjeta: any) =>
                                    `<option value="${tarjeta.for_id}">${tarjeta.for_descripcion}</option>`
                                )
                                .join('')}
                            </select>
                            <input type="number" class="form-control pago-importe" placeholder="Importe">
                            <button type="button" class="btn btn-danger btn-remove" onclick="removeFormaDePago(this)">-</button>
                          </div>
                        </div>
                      </div>
                      <button type="button" class="btn btn-success" id="btn-add-forma-pago">Agregar Forma de Pago</button>
                    </div>
                  </div>
                  <p id="error-message" class="text-danger mt-2" style="display:none;">El total de los importes debe ser igual al precio.</p>
                </form>
              `,
              showCancelButton: true,
              confirmButtonText: 'Procesar',
              allowOutsideClick: false, // Evita el cierre al hacer clic fuera del modal
              customClass: {
                popup: 'swal2-no-escape' // Evita el cierre con "Escape"
              },
              preConfirm: () => {
                
                const tipoMembresiaSelect = document.getElementById('tipoMembresia') as HTMLSelectElement;
                const selectedOption = tipoMembresiaSelect.options[tipoMembresiaSelect.selectedIndex];

                const tipoFormaPagoSelect = document.getElementById('tipoDocumento') as HTMLSelectElement;
                const FormaPagoselectedOption = tipoFormaPagoSelect.value; 

                const tipoPago = selectedOption.getAttribute('data-tipopago') || '1 mes';
                const precioRaw = selectedOption.getAttribute('data-precio') || 'S/. 0.00';
                const tipoMembresia = tipoMembresiaSelect.value;
  
                const fechaInicio = (document.getElementById('fechaInicio') as HTMLInputElement).value;
                const cantidadMeses = parseInt((document.getElementById('cantidadMeses') as HTMLInputElement).value, 10);
  
                const precioBase = parseFloat(precioRaw.replace(/S\/\.\s?/g, '').replace(',', '.'));
                const precioTotal = precioBase * cantidadMeses;
  
                const pagos = Array.from(document.querySelectorAll('.pago-tipo')).map((tipo: any, index) => {
                  const importe = parseFloat((document.querySelectorAll('.pago-importe')[index] as HTMLInputElement).value || '0');
                  return { tipo: tipo.value, importe };
                });
                // Validar que ningún importe esté vacío o sea 0
                for (const pago of pagos) {
                  if (!pago.importe || pago.importe <= 0) {
                    Swal.showValidationMessage('Todos los importes deben ser mayores a 0.');
                    return false;
                  }
                }
                const popup = Swal.getPopup()!;
                const tipoDocumentoSelect = popup.querySelector('#tipoDocumento') as HTMLSelectElement;
                const documentoInput = popup.querySelector('#documentoidentidad') as HTMLInputElement;

                const tipoDocumento = tipoDocumentoSelect.value;
                const documentoValor = documentoInput.value.trim();
                
                if (tipoDocumento !== '6') {
                  if (documentoValor === '') {
                    Swal.showValidationMessage('El campo Documento es obligatorio.');
                    return false;
                  }
                  if (tipoDocumento === '1' && documentoValor.length !== 11) {
                    Swal.showValidationMessage('Para Factura Electrónica, el documento debe tener 11 dígitos.');
                    return false;
                  }
                  if (tipoDocumento === '2' && documentoValor.length !== 8) {
                    Swal.showValidationMessage('Para Boleta Electrónica, el documento debe tener 8 dígitos.');
                    return false;
                  }
                } else {
                  // Si es SIN DOCUMENTO, se asignan los valores por defecto
                  documentoInput.value = '00000001';
                  razonSocialInput.value = 'Cliente Varios';
                }

                if (razonSocialInput.value.trim() === '') {
                  Swal.showValidationMessage('El campo Razón Social no puede estar vacío.');
                  return false;
                }

                const totalPagos = pagos.reduce((sum, pago) => sum + pago.importe, 0);
  
                if (totalPagos !== precioTotal) {
                  (document.getElementById('error-message') as HTMLElement).style.display = 'block';
                  Swal.showValidationMessage('La suma de los importes debe ser igual al precio total.');
                  return false;
                }
  
                if (!tipoMembresia || !fechaInicio || !cantidadMeses) {
                  Swal.showValidationMessage('Por favor complete todos los campos.');
                  return false;
                }
  
                //return { id, tipoMembresia, fechaInicio, cantidadMeses, pagos };
                // Construir payload
              const payload = {
                pedido: [[{
                  idplato: id,
                  nombre: nombreCliente,
                  comentario: documentoDni,
                  precio: precioTotal,
                  cantidad: cantidadMeses,
                  estado: 1,
                  iddetalle: selectedOption.textContent,
                }]],
                clientesSeleccionados: [{
                  id: id,
                  nombre: nombreCliente,
                  documentoIdentidad: documentoDni,
                  membresiaActual: selectedOption.textContent,
                }],
                costoMembresia: precioTotal.toFixed(2),
                nombreMembresia: selectedOption.textContent,
                
                fechaInicio: fechaInicio,
                cantidadMeses: cantidadMeses,
                idMembresia: tipoMembresia,
                  pago: {
                    tipo_comprobante: FormaPagoselectedOption,
                    delivery: 0,
                    cliente: `${id}/${documentoValor}/${razonSocialInput.value}/0/${selectedOption.textContent}`,
                    efectivo: pagos.reduce((sum, pago) => pago.tipo === '1' ? sum + pago.importe : sum, 0), // Suma solo los montos con for_id = 1
                    monto: 0,
                    tarjeta: pagos
                    .filter((pago) => pago.tipo !== '1') // Filtra los métodos de pago que no son efectivo
                    .map((pago) => ({
                      tipo_comprobante: pago.tipo, // Usa for_id como tipo_comprobante
                      monto: pago.importe, // Monto del método de pago
                    })),
                    formaPago : FormaPagoselectedOption,
                  },
                clientes: [{
                  id: id,
                  nombre: nombreCliente,
                  documentoIdentidad: documentoDni,
                  membresiaActual: selectedOption.textContent,
                }],
                listaServicios: [{
                  id: tipoMembresia,
                  nombreServicio: `${selectedOption.textContent}\n ${nombreCliente} - ${documentoDni}\n`,
                  precioServicio: precioTotal.toFixed(2),
                  tipoPeriodo: '',
                  categoriaMembresia: '',
                  tipoPago: tipoPago,
                  fechaInicio: fechaInicio,
                  estado: 1,
                  cantidad: cantidadMeses,
                }],
              };

              return payload;
              },
            }).then((result) => {
              if (result.isConfirmed) {
                this.isLoading = true;
                // Realizar la solicitud al servidor
                const payload = result.value;
  
                this.conexion
                  .enviar_seguro('web_service/procesar_venta_pago', payload, token)
                  .subscribe(
                    (response: any) => {
                      this.isLoading = false;
                      if (response.estado) {
                        Swal.fire('¡Éxito!', response.mensaje, 'success').then((result) => {
                          if (result.isConfirmed) {
                            // Acción que deseas realizar después de que el usuario haga clic en "Aceptar"
                            window.location.reload();
                          }
                        });
                        
                      } else {
                        Swal.fire('Error', response.mensaje, 'error');
                      }
                    },
                    (error) => {
                      this.isLoading = false;
                      Swal.fire('Error', 'Ocurrió un problema al enviar los datos.', 'error');
                    }
                  );
              }
            });
            
            const popup = Swal.getPopup()!;
            const tipoDocumentoSelect = popup.querySelector('#tipoDocumento') as HTMLSelectElement;
            const documentoInput = popup.querySelector('#documentoidentidad') as HTMLInputElement;
            const razonSocialInput = popup.querySelector('#razonsocial') as HTMLInputElement;
            documentoInput.disabled = true;
            razonSocialInput.disabled = true;
            // Manejar cambios en Tipo de Comprobante
            tipoDocumentoSelect.addEventListener('change', () => {
              const value = tipoDocumentoSelect.value;
              if (value === '6') {
                // Sin documento: auto asignar valores y deshabilitar campo
                documentoInput.value = '00000001';
                razonSocialInput.value = 'Cliente Varios';
                documentoInput.disabled = true;
                razonSocialInput.disabled = true;
              } else {
                documentoInput.disabled = false;
                razonSocialInput.disabled = false;
                if (value === '1') {
                  // Factura Electrónica: permitir solo 10 dígitos
                  documentoInput.value = ''
                  razonSocialInput.value = ''
                  documentoInput.setAttribute('maxlength', '11');
                  razonSocialInput.placeholder = 'Ingrese Razón Social';
                  documentoInput.placeholder = 'Ingrese 11 dígitos';
                } else if (value === '2') {
                  // Boleta Electrónica: permitir solo 8 dígitos
                  documentoInput.value = '00000001';
                  razonSocialInput.value = 'Cliente Varios';
                  documentoInput.setAttribute('maxlength', '8');
                  documentoInput.placeholder = 'Ingrese 8 dígitos';
                }
              }
            });
            
            documentoInput.addEventListener('input', () => {
              // Eliminar cualquier carácter que no sea dígito
              documentoInput.value = documentoInput.value.replace(/\D/g, '');
              const length = documentoInput.value.length;
              if (length === 8 || length === 11) {
 
              }
            });

            // Cambiar precio dinámicamente al seleccionar un tipo de membresía
            const tipoMembresiaSelect = document.getElementById('tipoMembresia') as HTMLSelectElement;
            tipoMembresiaSelect.addEventListener('change', () => {
              const selectedOption = tipoMembresiaSelect.options[tipoMembresiaSelect.selectedIndex];
              const nuevoPrecio = selectedOption.getAttribute('data-precio') || '0'; 
              (document.getElementById('precio') as HTMLInputElement).value = nuevoPrecio;
              actualizarFechaFin(); 
            });
            
            const cantidadMesesInput = document.getElementById('cantidadMeses') as HTMLInputElement;
            


            const fechaInicioInput = document.getElementById('fechaInicio') as HTMLInputElement;
            const fechaFinInput = document.getElementById('fechaFin') as HTMLInputElement;

            const actualizarFechaFin = () => {
              const selectedOption = tipoMembresiaSelect.options[tipoMembresiaSelect.selectedIndex];
              const tipoPago = selectedOption.getAttribute('data-tipopago') || '1 mes';
              const precioRaw = selectedOption.getAttribute('data-precio') || 'S/. 0.00'; // Precio base de la membresía
              const fechaInicio = fechaInicioInput.value;
              const cantidadMeses = parseInt((document.getElementById('cantidadMeses') as HTMLInputElement).value, 10);
              const precioInput = document.getElementById('precio') as HTMLInputElement;


              try {
                const precioBase = parseFloat(precioRaw.replace(/S\/\.\s?/g, '').replace(',', '.'));
                const nuevaFechaFin = this.calcularFechaFin(fechaInicio, tipoPago, cantidadMeses);
                fechaFinInput.value = nuevaFechaFin;
                const precioTotal = precioBase * cantidadMeses;
                precioInput.value = precioTotal.toFixed(2); // Actualiza el campo de precio
                console.log(precioTotal)
              } catch (error) {
                console.error('Error al calcular la fecha de fin:', error);
              }
            };
            actualizarFechaFin(); 
            cantidadMesesInput.addEventListener('input', actualizarFechaFin); // Detecta cambios en tiempo real
            fechaInicioInput.addEventListener('input', actualizarFechaFin);
            // Agregar nueva forma de pago sin restricciones
            const addFormaPagoButton = document.getElementById('btn-add-forma-pago') as HTMLButtonElement;
            addFormaPagoButton.addEventListener('click', () => {
              const container = document.getElementById('formasDePagoContainer');
              const div = document.createElement('div');
              div.classList.add('form-group');
              div.innerHTML = `
                <div class="input-group mb-2">
                  <select class="form-control pago-tipo">
                    ${tarjetas
                      .map(
                        (tarjeta: any) =>
                          `<option value="${tarjeta.for_id}">${tarjeta.for_descripcion}</option>`
                      )
                      .join('')}
                  </select>
                  <input type="number" class="form-control pago-importe" placeholder="Importe">
                  <button type="button" class="btn btn-danger btn-remove" onclick="removeFormaDePago(this)">-</button>
                </div>
              `;
              container?.appendChild(div);
            });
            (window as any).removeFormaDePago = function (button: HTMLElement) {
              button.parentElement?.parentElement?.remove();
            };
          } else {
            Swal.fire('Error', 'No se pudieron cargar los datos.', 'error');
          }
        },
        (error) => {
          console.error('Error al obtener datos:', error);
          Swal.fire('Error', 'No se pudieron cargar los datos del servidor.', 'error');
        }
      );
  }
  
  private calcularFechaFin(fechaInicio: string, tipoPago: string, cantidadMeses: number): string {
    const fechaInicioObj = new Date(fechaInicio);
  
    // Extraer duración desde tipoPago
    const duracion = parseInt(tipoPago.match(/\d+/)?.[0] || "1", 10) * cantidadMeses;
  
    // Ajustar fecha según tipo de pago
    if (tipoPago.toLowerCase().includes('día')) {
      fechaInicioObj.setDate(fechaInicioObj.getDate() + duracion - 1);
    } else if (tipoPago.toLowerCase().includes('mes')) {
      fechaInicioObj.setMonth(fechaInicioObj.getMonth() + duracion);
    } else if (tipoPago.toLowerCase().includes('año')) {
      fechaInicioObj.setFullYear(fechaInicioObj.getFullYear() + duracion);
    } else {
      throw new Error('Tipo de pago no válido.');
    }
  
    return fechaInicioObj.toISOString().split('T')[0];
  }


  mostrarTablaMembresias(id: any, nombreCliente: string): void {
    if (this.isLoading) return;
    this.isLoading = true;
  
    const usuario: any = this.authenticationService.currentUserValue;
    const token = usuario['Token'];
  
    // Llama a traerMembresias para obtener los datos
    this.conexion
      .enviar_seguro('Membresias/traer_membresias', { id: id }, token)
      .subscribe(
        (response: any) => {
          this.isLoading = false;
          if (response && response.data) {
            const membresias = response.data.membresia;
            // Generar tabla HTML
            const tablaHtml = `
              <div class="table-responsive">
                <table id="tablaMembresias" class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Glosario</th>
                      <th>Colaborador</th>
                      <th>Membresia</th>
                      <th>Fecha Inicio</th>
                      <th>Fecha Fin</th>
                      <th>Fecha Venta</th>
                      <th>Importe</th>
                      <th>Días Asistidos</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${membresias
                      .map(
                        (membresia: any) => `
                      <tr>
                        <td>${membresia.id}</td>
                        <td>${this.limpiarTexto(membresia.glosario)}</td>
                        <td>${membresia.colaborador}</td>
                        <td>${membresia.descripcionMembresia}</td>
                        <td>${membresia.fechaInicio}</td>
                        <td>${membresia.fechaFin}</td>
                        <td>${membresia.fechaVenta}</td>
                        <td>${membresia.importe}</td>
                        <td>${membresia.diasAsistidos}</td>
                        <td style="background-color: ${this.obtenerColorEstado(
                          membresia.estado
                        )}; color: ${this.obtenerColorTexto(membresia.estado)}; font-weight: bold;">
                          ${membresia.estado}
                        </td>
                      </tr>`
                      )
                      .join('')}
                  </tbody>
                </table>
              </div>
            `;
  
            // Mostrar el modal con SweetAlert2
            Swal.fire({
              title: `Detalle Renovaciones ${nombreCliente}`,
              html: tablaHtml,
              width: '90%',
              showCancelButton: true,
              cancelButtonText: 'Cerrar',
              didOpen: () => {
                // Inicializar DataTables
                $('#tablaMembresias').DataTable({
                  pageLength: 5,
                  lengthMenu: [5, 10, 20, 50],
                  language: {
                    url: '//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json',
                  },
                });
              },
            });
          } else {
            Swal.fire('Error', 'No se pudieron cargar los datos.', 'error');
          }
        },
        (error) => {
          this.isLoading = false;
          console.error('Error al obtener datos:', error);
          Swal.fire('Error', 'No se pudieron cargar los datos del servidor.', 'error');
        }
      );
  }

    // Método para limpiar texto y respetar saltos de línea al final
  private limpiarTexto(texto: string): string {
    return texto
      .replace(/^\s+|\s+$/g, '') // Eliminar espacios al inicio y al final
      .replace(/\n\s+/g, '\n') // Eliminar espacios después de cada salto de línea
      .replace(/\s+\n/g, '\n') // Eliminar espacios antes de cada salto de línea
      .replace(/\n/g, '<br>'); // Reemplazar saltos de línea por <br> para HTML
  }

  private obtenerColorEstado(estado: string): string {
    switch (estado) {
      case 'ACTIVO':
        return 'rgba(0, 128, 0, 0.2)'; // Verde opaco
      case 'POR INICIAR':
        return 'rgba(255, 165, 0, 0.2)'; // Ámbar a naranja opaco
      default:
        return 'rgba(255, 0, 0, 0.2)'; // Rojo opaco
    }
  }
  private obtenerColorTexto(estado: string): string {
    switch (estado) {
      case 'ACTIVO':
        return '#008000'; // Verde fuerte
      case 'POR INICIAR':
        return '#FF9900'; // Naranja fuerte
      default:
        return '#FF0000'; // Rojo fuerte
    }
  }
}
