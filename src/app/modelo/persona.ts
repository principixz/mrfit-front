export class Persona {
    apellido: string;
    nombre: string;
    fechavence: string;
    cuenta: string;
    token:string;
    dni:string;
    documento:string;
    constructor(apellido,nombre,fechavence,cuenta,token,dni,documento){
        this.apellido=apellido;
        this.nombre=nombre;
        this.fechavence=fechavence;
        this.cuenta=cuenta;
        this.token=token;
        this.dni=dni;
        this.documento=documento;
    }
}