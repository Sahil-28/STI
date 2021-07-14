import { WeatherForecastService } from './../weather-forecast.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { City } from '../city';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {

  cities: City[] = new Array<City>();
  currentLocation: any;
  temperature: any
  desc: any;
  wind: any
  press: any;
  weatherSearchForm!: FormGroup;
  weatherData: any;
  result: any;
  index:any;
  isValid:boolean = false;
  constructor(private weatherForecastService: WeatherForecastService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
        location:['']
    });
  }

  getCurrentData(data: any) {
    this.currentLocation = data.city;
    this.temperature = data.list[0].main;
    this.desc = data.list[0].weather[0];
    this.wind = data.list[0].wind;
    this.press = data.list[0].main;

  }

  sendToAPI(formValues:any){
    console.log('city is' + formValues.location);
    this.weatherForecastService.getWeatherData(formValues.location).subscribe(
      data => {
        this.isValid = true;
        this.getCurrentData(data);
        this.weatherData = data;
        console.log('the data is' + JSON.stringify(this.weatherData));
        
        console.log(this.isValid);
        if(this.cities.length === 0){
          this.result = this.weatherForecastService.addLocations(formValues.location);
        }
        this.cities = this.weatherForecastService.getAll();
        console.log('the value is', this.cities)
        for(let i = 0; i< this.cities.length; i++){
        console.log('city of i is ', this.cities[i])
        console.log('city is ', formValues.location)
        if(this.cities[i] !== formValues.location){
          console.log('current city is', this.cities[i])
          this.weatherForecastService.addLocations(formValues.location);
        }
      }
      },err => alert('City is not valid '));
      this.isValid = false;
  }

  deleteCity(id: number){
    this.weatherForecastService.delete(id);
  }

  refresh(location: any){
    this.weatherForecastService.getWeatherData(location).subscribe(
      data => {
        this.getCurrentData(data);
        this.weatherData = data;
        console.log('the data is' + JSON.stringify(this.weatherData));
      });
  }
}
