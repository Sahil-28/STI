import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { City } from './city';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  cities: City[] = new Array<City>();

  constructor( private http: HttpClient) { }

  getWeatherData(location: any){
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position)
        },
        (error)=> {
          observer.next(error)
        }
      )
    }).pipe(
      map((value: any)=> {
        return new HttpParams()
          .set('q', location)
          .set('lon', value.coords.longitude)
          .set('lat', value.coords.latitude)
          .set('units', 'metric')
          .set('appid', 'c51223c219d6aec8cb8c5210449bd859')

      }),
      switchMap((values) => {
        return this.http.get('https://api.openweathermap.org/data/2.5/forecast', { params: values} )
      })
    )

  }

  getFutureData(){
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position)
        },
        (error)=> {
          observer.next(error)
        }
      )
    }).pipe(
      map((value: any)=> {
        return new HttpParams()
          .set('lon', value.coords.longitude)
          .set('lat', value.coords.latitude)
          .set('units', 'metric')
          .set('appid', 'c51223c219d6aec8cb8c5210449bd859')

      }),
      switchMap((values) => {
        return this.http.get('https://api.openweathermap.org/data/2.5/forecast', { params: values} )
      })
    )

  }

  getAll(){
    return this.cities;
  }

  getId(loc: City){
    return this.cities.indexOf(loc);
  }

  addLocations(loc: City){
    let newLength = this.cities.push(loc);
    let index = newLength - 1;
    return index;
  }

  delete(id: number){
    this.cities.splice(id, 1);
  }

}
