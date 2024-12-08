
import { Injectable } from '@angular/core';

// tslint:disable-next-line: import-spacing
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoadingBarService } from '@ngx-loading-bar/core';
import urls from '../../assets/config.json';
@Injectable()
export class Servicio {
  public handleError: any;



 
 
//public url_global =  'http://localhost/facturacion_backend/';
public url_global =  'http://172.20.10.3/restaurante_backend/';
//public url_global =  'https://jjingenieros.selvafood.com/facturacion_backend/';
//public url_global= urls["url"];



  constructor(private http: HttpClient,public carga :LoadingBarService) {}


   public enviar_servidor( url:string,  json= {  } ) {
    // let headers=new Headers( {
    //       "Content-type":"application/json"
    //     }
    //   );
    return  this.http.post('Web_service/LoginUsuario' , json).subscribe((data) => {
    console.log(data);
    });

   }

   // tslint:disable-next-line: member-access
  enviar_archivos( url: string , json= {  } ) {
    return this.http.post<any>(this.url_global +

      url,  json ).pipe(map(
        (res) =>  {
          console.log(res);
          return res;
        },
      ));
  }

   public enviar(  url: string , json= {  } )  {

    const httpOptions = {
      headers: new HttpHeaders({

        Accept: 'application/json',
        'Content-Type':  'application/json',
        // 'Content-Type':  'multipart/form-data',

      }),
    };

    return  this.http.post(this.url_global  + url,  json, httpOptions).pipe(map(
        (res) =>  {
          // console.log(res);
          return res;
        },
      ));
   }

   public enviar_seguro(url:string, json={

   }, token:string,cargar=1) {
 
    let _this=this;
    if(cargar==1){
      _this.carga.start();

    }
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': token,

      }),
    };
    return  this.http.post(this.url_global + url, json, httpOptions).pipe(map(
        (res) => {
          if(cargar==1){
          _this.carga.stop();
          }
          return res;
        },
      ));

   }


   public enviar_seguro_file(url:string, json={
     
   }, token:string) {

    const httpOptions = {
      headers: new HttpHeaders({
       
        'Authorization': token,

      }),
    };
    return  this.http.post(this.url_global + url, json, httpOptions).pipe(map(
        (res) => {

          return res;
        },
      ));

   }
}
