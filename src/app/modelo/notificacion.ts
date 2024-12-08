export class Notificacion{
    id:string;
    url:string;
    descripcion:string;
    fecha:string;
    datos:any;
    titulo:string;

   constructor(id:string,url:string,descripcion:string,fecha:string,datos:string,titulo:string)
   {
      this.id=id;
      this.url=url;
      this.descripcion=descripcion;
      this.fecha=fecha;
      this.datos=datos;
      this.titulo=titulo;
  }

}

