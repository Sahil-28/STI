import { WeatherForecastService } from './../weather-forecast.service';
import { Component, OnInit } from '@angular/core';
import { City } from '../city';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  cities: City[] = new Array<City>();
  val:any;

  constructor(private weatherForecastService: WeatherForecastService) {
   }

  ngOnInit(): void {
  this.cities = this.weatherForecastService.getAll();
  console.log('the cities are', this.cities);
  }

  delete(){
    while(this.cities.length> 0){
      this.cities.pop();
    }
  }

}
