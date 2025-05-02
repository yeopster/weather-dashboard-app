// chart.component.ts
import { Component, Input, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  template: '<highcharts-chart [Highcharts]="Highcharts" [options]="chartOptions" style="width:100%; height:400px;"></highcharts-chart>'
})
export class ChartComponent implements OnChanges {
  @Input() data: any[] = [];
  Highcharts = Highcharts;
  chartOptions: any = {};

  ngOnChanges() {
    this.chartOptions = {
      title: { text: 'Temperature & Humidity Trend' },
      xAxis: { categories: this.data.map(d => d.date) },
      yAxis: [{ title: { text: 'Temperature (°C)' } }, { title: { text: 'Humidity (%)' }, opposite: true }],
      series: [
        { name: 'Temperature', data: this.data.map(d => d.temperature), type: 'line', yAxis: 0 },
        { name: 'Humidity', data: this.data.map(d => d.humidity), type: 'line', yAxis: 1 },
      ],
    };
  }
}
