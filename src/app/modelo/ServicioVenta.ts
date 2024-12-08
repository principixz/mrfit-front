export class ServicioVenta {
    id: string;
    nombreServicio: string;
    precioServicio: number;
    tipoPeriodo: string;
    categoriaMembresia: string;
    tipoPago: string;
    estado: string;
    cantidad:number;

    constructor(
        id: any,
        nombreServicio: any,
        precioServicio: any,
        tipoPeriodo: any,
        categoriaMembresia: any,
        tipoPago: any,
        estado: any,
        cantidad: any
    ) {
        this.id = id;
        this.nombreServicio = nombreServicio;
        this.precioServicio = precioServicio;
        this.tipoPeriodo = tipoPeriodo;
        this.categoriaMembresia = categoriaMembresia;
        this.tipoPago = tipoPago;
        this.estado = estado;
        this.cantidad = 1;
    }
}