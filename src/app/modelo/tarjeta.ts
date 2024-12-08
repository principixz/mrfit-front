export class Tarjeta {
    id: string;
    tarjeta: string;
    fecha: string;
    cvc: string;
    estado:boolean;
    constructor(id,tarjeta,fecha, cvc,estado){
        this.id=id;
        this.tarjeta=tarjeta;
        this.fecha=fecha;
        this.cvc=cvc;
        this.estado=estado;
    }
}