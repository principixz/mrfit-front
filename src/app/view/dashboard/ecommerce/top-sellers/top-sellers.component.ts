import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/servicio';
import { Servicio } from 'src/app/servicio/servicio';

@Component({
  selector: 'app-top-sellers',
  templateUrl: './top-sellers.component.html',
  styleUrls: ['./top-sellers.component.scss'],
})
export class TopSellersComponent implements OnInit {
  selectedPeriod: string = 'week'; // Periodo seleccionado
  sellers: { id:string; dni: string; name: string; fecha: string }[] = []; // Inicialización vacía

  constructor(
    private authenticationService: AuthenticationService,
    public servicio: Servicio
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const usuario: any = this.authenticationService.currentUserValue;
    const token = usuario['Token'].toString();

    // Simulación de API: Ajusta la URL de acuerdo con tu backend
    this.servicio
    .enviar_seguro('Membresias/traerVencidosHoy', {}, token)
    .subscribe(
      (response: any) => {
        if (response && response.vencidos_hoy) {
          this.sellers = response.vencidos_hoy.map((cliente: any) => ({
            id: cliente.cliente_id || 'N/A',
            name: cliente.cliente_nombres || 'Desconocido',
            dni: cliente.cliente_dni || 'No Registrado',
            fecha: cliente.fecha_vencimiento || 'Sin Fecha',
            dias_para_vencimiento: cliente.dias_para_vencimiento || 'No especificado',
          }));
        } else {
          this.sellers = []; // Si no hay datos, inicializar vacío
          console.warn('No se encontraron datos en la respuesta.');
        }
      },
      (error) => {
        console.error('Error al cargar datos:', error);
        this.sellers = []; // Manejo en caso de error
      }
    );
  }
}