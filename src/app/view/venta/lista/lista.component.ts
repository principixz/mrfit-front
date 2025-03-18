
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
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  public datatable!: DataTableDirective;

  public dtOptions: DataTables.Settings = {  };
  public listaasociado:any;
  public asociado:any;
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
            _this.conexion.url_global+'web_service/buscar_tabla',
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
      { data: 'cliente' }, 
      {data : 'glosario'},
      { data: 'fecha' }, 
      { data: 'monto' }, 
      { data: 'serie' },
      { data: 'button' }
    ]
    };
  }

  //dtOptions: DataTables.Settings = {};
  //persons: Person[];


  constructor(private http: HttpClient, private conexion: Servicio, public datos: AuthenticationService,   private authenticationService: AuthenticationService,) { }

 // tslint:disable-next-line: member-access
 /*ngOnInit(): void {
  const ser = this.datos.currentUserValue;
  // tslint:disable-next-line: no-string-literal
  const dat = ser['Token'];
  // tslint:disable-next-line: variable-name
  const _this = this;

  this.conexion.enviar_seguro('Api/ws_cargar_venta', {  }, dat).pipe().subscribe(
    (data)  =>  {
      this.asociado = data;
      this.dtTrigger.next();
    },
    (error) =>  {
    },
  );

  this.dtOptions = {
    order: [[ 0, "desc" ]],
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
    zeroRecords: 'No se encontraron registros',
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
  };
}*/
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
    var url=this.conexion.url_global+"Ventas/mostrar_comprobante/"+id;
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
        return fetch(this.conexion.url_global+'Api/procesar_eliminacion_factura',{
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

}




