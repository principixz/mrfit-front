export class AsistenciaModelo {
    id: string;
    nombre: string;
    fecha: string;
   estado:string;
   asociadonum:string;
    constructor(id,nombre,fecha,estado,asociadonum){
        this.id=id;
        this.nombre=nombre;
        this.fecha=fecha;
        this.estado=estado;

        this.asociadonum=asociadonum;

    }
}