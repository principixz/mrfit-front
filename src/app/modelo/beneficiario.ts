export class Beneficiario {
    nombre: string;
    NroIden: string;
    PARENTESCO: string;
    PORCENTAJE: string;
    constructor(nombre,NroIden,PARENTESCO,PORCENTAJE){
        this.nombre=nombre;
        this.NroIden=NroIden;
        this.PARENTESCO=PARENTESCO;
        this.PORCENTAJE=PORCENTAJE;
    }
}