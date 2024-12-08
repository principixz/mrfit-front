export class DetalleVenta {
    id: string;
    descripcion: string;
   // estado_activo: boolean;
   precio:number;
   cantidad:number;
   estado:boolean;
  // lista:[]
   detalle:string;

   
    constructor(id:any,descripcion:any,precio:any,cantidad:any,estado:any,detalle:string){
        this.id=id;
        this.descripcion=descripcion;
        this.precio=precio;
        this.cantidad=cantidad;
        this.estado=estado;
       // this.lista=lista;
        this.detalle=detalle;
        //this.estado_activo=estado_activo;
    }


}