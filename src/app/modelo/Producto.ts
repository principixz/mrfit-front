export class Producto {
    id: string;
    descripcion: string;
   // estado_activo: boolean;
   precio:number;
   stock:Int16Array;
   producto_solo_asociado:number;
   estado_escritura:Int16Array;

   
    constructor(id,descripcion,precio,stock,producto_solo_asociado,estado_escritura){
        this.id=id;
        this.descripcion=descripcion;
        this.precio=precio;
        this.stock=stock;
        this.producto_solo_asociado=producto_solo_asociado;
        this.estado_escritura=estado_escritura;
    }
}