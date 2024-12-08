export class Pedido {
   iddetalle:string;
    idplato:String;
      nombre:String;
      comentario:String;

      precio:number;

      cantidad:number;
     estado:number;
  

   
    constructor(id:String,nombre:String,comentario:String,precio:number,cantidad:number,estado:number,iddetalle:string){
      this.idplato=id;
      this.nombre=nombre;
      this.comentario=comentario;
      this.precio=precio;
      this.cantidad=cantidad;
      this.estado=estado;
      this.iddetalle=iddetalle;
        //this.estado_activo=estado_activo;
    }


}