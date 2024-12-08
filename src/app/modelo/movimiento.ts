export class Movimiento{
     nombre:String;
   fecha:String;
   monto:String;
    signo:String;
    constructor(nombre,monto,fecha, signo){
        this.nombre=nombre;
        this.monto=monto;
        this.fecha=fecha;
        this.signo=signo;
    }
  }