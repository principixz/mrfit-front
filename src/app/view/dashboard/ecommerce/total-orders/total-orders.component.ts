import { Component, Input, OnInit } from '@angular/core'; 
import { AuthenticationService } from 'src/app/servicio';
import { Servicio } from 'src/app/servicio/servicio';

@Component({
  selector: 'app-total-orders',
  templateUrl: './total-orders.component.html',
  styleUrls: ['./total-orders.component.scss']
})
export class TotalOrdersComponent implements OnInit {
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() subtitle: string = '';
  @Input() badgeType: 'success' | 'danger' = 'success';
  @Input() iconColor: string = 'icon-container';

  total: number = 0; // Para almacenar el total dinámicamente
  badgeValue: string = ''; // Para el valor del badge dinámicamente

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
    switch (this.title) {
      case 'Usuarios Activos':

        this.servicio
          .enviar_seguro('Membresias/traerUsuariosActivosInactivos', {}, token)
          .subscribe((response: any) => {
                    //this.dataService.getTotalOrders().subscribe((data) => {
            this.total = response.activos;
            this.subtitle = response.mensaje_activos; // Cambia esto según tus datos dinámicos
          });

        //});
        break;
      case 'Usuarios Inactivos':
        this.servicio
          .enviar_seguro('Membresias/traerUsuariosActivosInactivos', {}, token)
          .subscribe((response: any) => {
          this.total = response.inactivos;
          this.subtitle = response.mensaje_inactivos;
        });
        break;
      case 'Vencidos Hoy':
        this.servicio
          .enviar_seguro('Membresias/traerUsuariosActivosInactivos', {}, token)
          .subscribe((response: any) => {
            this.total = response.vencenhoy;
            this.subtitle = response.mensaje_vencen_hoy; 
        });
        break;
      case 'New Customers':
        //this.dataService.getNewCustomers().subscribe((data) => {
          this.total = 121;
          this.badgeValue = '7.80%';
        //});
        break;
    }
  }
}