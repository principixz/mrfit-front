import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AuthenticationService } from 'src/app/servicio';
import { Servicio } from 'src/app/servicio/servicio';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';

Exporting(Highcharts);
ExportData(Highcharts);
import OfflineExporting from 'highcharts/modules/offline-exporting';
OfflineExporting(Highcharts);

@Component({
  selector: 'app-total-sales',
  templateUrl: './total-sales.component.html',
  styleUrls: ['./total-sales.component.scss']
})
export class TotalSalesComponent {
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  rawData: any[] = [];
  hourlyData: [number, number][] = [];
  dailyData: [number, number][] = [];
  selectedView: string = 'daily'; // Predeterminado a "Por día"

  constructor(
    private authenticationService: AuthenticationService,
    public servicio: Servicio
  ) {}

  ngOnInit(): void { 
    const usuario: any = this.authenticationService.currentUserValue;
    const token = usuario['Token'].toString();

    Highcharts.setOptions({
      lang: {
        months: [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        weekdays: [
          'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
        ],
        shortMonths: [
          'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
          'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        ],
        loading: 'Cargando...',
        rangeSelectorFrom: 'Desde',
        rangeSelectorTo: 'Hasta',
        rangeSelectorZoom: 'Periodo',
        resetZoom: 'Restablecer zoom',
        resetZoomTitle: 'Restablecer el nivel de zoom',
      },
      time: {
        timezone: 'America/Lima', // Configura la zona horaria de Perú
        //useUTC: false, // Evita que use UTC global
      }
    });

    this.chartOptions = {
      chart: {
        zooming: {
          type: 'x'
        },
 
      },
      title: {
        text: `Mr. Control Asistencia`,
        align: 'left'
      },
      subtitle: {
        text: 'Uso exclusivo Mr. Fit',
        align: 'left'
      },
      tooltip: {
        valueDecimals: 2,
        shared: true
      },
      xAxis: {
        type: 'datetime'
      },
 
      series: [
        {
          type: 'line',
          data: [], // Inicializa vacío
          lineWidth: 0.5,
          name: 'Hourly data points'
        }
      ],
      exporting: {
        enabled: true, // Habilita la exportación
        buttons: {
          contextButton: {
            menuItems: [
              'downloadPNG',
              'downloadJPEG',
              'downloadPDF',
              'downloadSVG',
              'separator',
              'downloadCSV',
              'downloadXLS'
            ]
          }
        }
      }
    };

    this.traerDatos(token);
  }

  traerDatos(token: string): void {
    this.servicio
      .enviar_seguro('Membresias/traerAsistenciasPorHora', {}, token)
      .subscribe((response: any) => {
        const data = response.points;
        this.rawData = data;

        // Convertir fechas a timestamps y organizar
        this.hourlyData = data
          .map(([datetime, value]: [string, number]) => {
            const peruTime = new Date(datetime + ' UTC');
            return [peruTime.getTime(), value];
          })
        .sort((a: [number, number], b: [number, number]) => a[0] - b[0]); 
        this.dailyData = this.agruparPorDia(this.hourlyData); 
        this.actualizarChart();
      });
  }

  agruparPorDia(points: [number, number][]): [number, number][] {
    const grouped = new Map<string, number>();

    points.forEach(([timestamp, value]) => {
      const date = new Date(timestamp);
      const dayKey = date.toISOString().split('T')[0];

      if (grouped.has(dayKey)) {
        grouped.set(dayKey, grouped.get(dayKey)! + value);
      } else {
        grouped.set(dayKey, value);
      }
    });

    return Array.from(grouped.entries()).map(([day, total]) => {
      const date = new Date(day);
      return [date.getTime(), total];
    });
  }

  onSelectionChange(): void {
    this.actualizarChart();
  }

  actualizarChart(): void { 
    const selectedData = this.selectedView === 'daily' 
    ? JSON.parse(JSON.stringify(this.dailyData)) // Clona los datos por día
    : JSON.parse(JSON.stringify(this.hourlyData)); // Clona los datos por hora
 
    this.chartOptions = {
      chart: {
        zooming: {
          type: 'x'
        }
      },
      title: {
        text: 'Datos de asistencias - Por hora y por día',
        align: 'left'
      },
      xAxis: {
        type: 'datetime' // Eje X basado en tiempo
      },
      series: [
        {
          type: 'line',
          data: selectedData, // Datos agrupados por día
          name: 'Por día',
          lineWidth: 1.5,
          color: '#28A745'
        }, 
      ]
    };
  }

  downloadChart(format: string): void {
    const chart = Highcharts.charts[0]; // Obtiene el gráfico
 
    if (chart) {
      switch (format) {
        case 'png':
          chart.exportChartLocal({ type: 'image/png' }, {}); // Agrega un objeto vacío como segundo argumento
          break;
        case 'pdf':
          chart.exportChartLocal({ type: 'application/pdf' }, {}); // Segundo argumento vacío
          break;
        case 'csv':
          chart.downloadCSV(); // No necesita argumentos adicionales
          break;
        default:
          console.error('Formato no soportado:', format);
      }
    }
  }
}