import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { WeatherService } from './../services/weather.service';
import { of } from 'rxjs';
import { AgGridModule } from 'ag-grid-angular';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule } from '@angular/forms';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherService: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    const weatherSpy = jasmine.createSpyObj('WeatherService', ['getWeatherData']);
    await TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [AgGridModule, HighchartsChartModule, FormsModule],
      providers: [{ provide: WeatherService, useValue: weatherSpy }]
    }).compileComponents();

    weatherService = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;
    weatherService.getWeatherData.and.returnValue(of({ items: [{ forecasts: [] }] }));
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchData on init', () => {
    spyOn(component, 'fetchData');
    component.ngOnInit();
    expect(component.fetchData).toHaveBeenCalled();
  });
});