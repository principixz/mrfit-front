import { Component } from '@angular/core'; 
import {
    ApexChart,
    ApexPlotOptions,
    ApexFill,
    ApexDataLabels,
    ApexNonAxisChartSeries
  } from 'ng-apexcharts';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service'; 
import { DatePipe } from '@angular/common';

export interface ChartOptions {
    series: ApexNonAxisChartSeries; // Para gráficos sin ejes como radialBar
    chart: ApexChart;
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
    dataLabels: ApexDataLabels;
  }

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'], 
})
export class WelcomeComponent {
    public chartOptions: ChartOptions;
    currentDate: any;

 
    constructor(
  public themeService: CustomizerSettingsService
) {
  this.chartOptions = {
    series: [75],
    chart: {
      height: 200,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: '70%',
        },
        dataLabels: {
          value: {
            fontSize: '22px',
            color: '#111',
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    fill: {
      colors: ['#00cae3'],
    },
    dataLabels: {
      enabled: true,
    },
  };
}
}