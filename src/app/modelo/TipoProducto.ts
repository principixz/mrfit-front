export class TipoProducto {
    id: string;
    descripcion: string;
    estado_activo: boolean;

   
    constructor(id,descripcion,estado_activo){
        this.id=id;
        this.descripcion=descripcion;
        this.estado_activo=estado_activo;
    }
}