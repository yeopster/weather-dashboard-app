import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch weather data', () => {
    const mockData = { items: [{ forecasts: [] }] };
    service.getWeatherData('2025-04-01').subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('https://api.data.gov.sg/v1/environment/24-hour-weather-forecast?date=2025-04-01');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});