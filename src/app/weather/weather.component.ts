import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../services/weather.service';
import * as Highcharts from 'highcharts';
import { ColDef } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AgGridModule, HighchartsChartModule]
})
export class WeatherComponent implements OnInit {
  weatherData: any[] = [];
  startDate: string = new Date().toISOString().split('T')[0];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Temperature and Humidity Trend'
    },
    xAxis: {
      categories: []
    },
    yAxis: [
      {
        title: {
          text: 'Temperature (°C)'
        }
      },
      {
        title: {
          text: 'Humidity (%)'
        },
        opposite: true
      }
    ],
    series: [
      {
        name: 'Temperature',
        type: 'line',
        data: []
      },
      {
        name: 'Humidity',
        type: 'line',
        yAxis: 1,
        data: []
      }
    ]
  };
  columnDefs: ColDef[] = [
    { headerName: 'Date', field: 'date' },
    { headerName: 'Temperature (°C)', field: 'temperature' },
    { headerName: 'Humidity (%)', field: 'humidity' }
  ];
  rowData: any[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.weatherService.getWeatherData(this.startDate).subscribe({
      next: (data) => {
        this.weatherData = this.processData(data);
        this.rowData = this.weatherData;
        this.updateChart();
      },
      error: (error) => {
        console.error('Error fetching weather data:', error);
        // Use mock data on error
        this.weatherData = this.processData(null);
        this.rowData = this.weatherData;
        this.updateChart();
      }
    });
  }

  processData(data: any): any[] {
    return Array.from({ length: 30 }, (_, i) => ({
      date: new Date(new Date(this.startDate).setDate(new Date(this.startDate).getDate() + i)).toISOString().split('T')[0],
      temperature: Math.round((Math.random() * 10 + 20) * 10) / 10, // Mock temp (20-30°C)
      humidity: Math.round(Math.random() * 20 + 60)     // Mock humidity (60-80%)
    }));
  }

  updateChart() {
    const dates = this.weatherData.map(d => d.date);
    const temperatures = this.weatherData.map(d => d.temperature);
    const humidities = this.weatherData.map(d => d.humidity);

    this.chartOptions = {
      ...this.chartOptions,
      xAxis: {
        categories: dates
      },
      series: [
        {
          name: 'Temperature',
          type: 'line',
          data: temperatures
        },
        {
          name: 'Humidity',
          type: 'line',
          yAxis: 1,
          data: humidities
        }
      ]
    };
  }

  resetDate() {
    this.startDate = new Date().toISOString().split('T')[0];
    this.fetchData();
  }

  refreshData() {
    this.fetchData();
  }
}