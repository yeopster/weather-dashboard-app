import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { WeatherComponent } from './weather/weather.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, WeatherComponent]
})
export class AppComponent implements OnInit {
  title = 'Weather Forecast App';
  startDate = new Date().toISOString().split('T')[0];
  weatherData: any[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.weatherService.getWeatherData(this.startDate).subscribe(data => {
      this.weatherData = data;
    });
  }
}