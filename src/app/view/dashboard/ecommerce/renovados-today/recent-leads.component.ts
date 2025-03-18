import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AuthenticationService } from 'src/app/servicio';
import { Servicio } from 'src/app/servicio/servicio';

@Component({
  selector: 'app-renovados-today',
  templateUrl: './recent-leads.component.html',
  styleUrls: ['./recent-leads.component.scss']
})
export class RenovadosComponent {
  displayedColumns: string[] = ['id', 'nombre', 'dni', 'tipo_membresia', 'fecha_vencimiento', 'descripcion_cambio', 'fecha_modificacion'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  originalData: any[] = [];

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
      .enviar_seguro('Membresias/traerMembresiasRenovadas', {}, token)
      .subscribe(
        (response: any) => {
          if (response && response.data) {
            this.originalData = response.data.map((item: any) => ({
              id: item.id,
              nombre: item.empleado_nombres,
              dni: item.dni,
              tipo_membresia: item.tipo_membresia_descripcion,
              fecha_vencimiento: item.fecha_vencimiento,
              dias_para_vencimiento: item.dias_para_vencimiento,
              descripcion_cambio: item.descripcion_cambio,
              fecha_modificacion: item.fecha_modificacion
            }));
            this.dataSource.data = [...this.originalData];
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

  applyDateFilter(event: any): void {
    let selectedDate = event.value;
    selectedDate = new Date(selectedDate).toISOString().split('T')[0]; // Convierte la fecha seleccionada a formato YYYY-MM-DD
  
    this.dataSource.data = this.originalData.filter((row: any) => {
      const dateString = row.fecha_modificacion.split(' ')[0]; // Extrae solo la parte de la fecha de 'YYYY-MM-DD HH:mm:ss'
      console.log(dateString + ' xxx ' + selectedDate);
      return dateString === selectedDate; // Compara las fechas como cadenas
    });
  }

  clearFilter(): void {
    this.dataSource.data = [...this.originalData]; // Restaurar los datos originales
    console.log('Filtro limpiado, datos restaurados.');
  }
}