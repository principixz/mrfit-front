export class Producto {
    id: string;
    nombre: string;
    descripcion:string;
    foto: string;
    categoria:String;
    precio:string;
    categoria_id:string;
    stock:number;
    disponible:number;
    constructor(id:any,nombre:any,descripcion:any,foto:any,categoria:any,precio:string,categoria_id:any,stock:number,disponible:number){
        this.id=id;
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.foto=foto;
        this.categoria=categoria;
        this.precio=precio;
        this.categoria_id=categoria_id;
        this.stock=stock;
        this.disponible=disponible;
      

    }
}