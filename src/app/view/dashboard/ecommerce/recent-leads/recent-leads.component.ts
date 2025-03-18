import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AuthenticationService } from 'src/app/servicio';
import { Servicio } from 'src/app/servicio/servicio';

@Component({
  selector: 'app-recent-leads',
  templateUrl: './recent-leads.component.html',
  styleUrls: ['./recent-leads.component.scss']
})
export class RecentLeadsComponent {
  displayedColumns: string[] = ['id', 'nombre', 'dni', 'tipo_membresia', 'fecha_vencimiento', 'dias_para_vencimiento', 'estado_opcion'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private authenticationService: AuthenticationService,
    public servicio: Servicio
  ) {}

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const usuario: any = this.authenticationService.currentUserValue;
    const token = usuario['Token'].toString();

    this.servicio
      .enviar_seguro('Membresias/traerVencimientosProximos', {}, token)
      .subscribe(
        (response: any) => {
          if (response && response.data) {
            this.dataSource.data = response.data.map((item: any) => ({
              id: item.id,
              nombre: item.nombre,
              dni: item.dni,
              tipo_membresia: item.tipo_membresia_nombre,
              fecha_vencimiento: item.fecha_vencimiento,
              dias_para_vencimiento: item.dias_para_vencimiento,
              estado_opcion: item.estado_opcion
            }));
          } else {
            console.warn('No se encontraron datos en la respuesta.');
          }
        },
        (error) => {
          console.error('Error al cargar datos:', error);
          this.dataSource.data = []; // Limpia los datos en caso de error
        }
      );
  }
}