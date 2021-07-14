import { WeatherForecastService } from './../weather-forecast.service';
import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-future',
  templateUrl: './future.component.html',
  styleUrls: ['./future.component.css']
})
export class FutureComponent implements OnInit {
  futureData:any = [];

  constructor(private weatherForecastService: WeatherForecastService) { }

  ngOnInit(): void {
    this.weatherForecastService.getFutureData().pipe(
      pluck('list')
    ).subscribe(data => {
      this.getFutureData(data);
    })
  }

  getFutureData(data: any){
    for(let i = 0; i< data.length; i = i+8){
      this.futureData.push(data[i]);
    }
    console.log('future data is', this.futureData);
  }

}
