import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city';
import { District } from '../models/district';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  formDataCity: City = new City();
  readonly cityUrl = "http://localhost:35635/api/cities";
  // listCity: City[] = [];
  listCity: Array<City> = [];

  formDataDistrict: District = new District();
  readonly districtUrl = "http://localhost:35635/api/districts";
  listDistrict: Array<District> = [];

  constructor(private http: HttpClient) { }

  getCities() {
    this.http.get(this.cityUrl).toPromise().then(res => this.listCity = res as City[])
  }

  getDistricts() {
    this.http.get(this.districtUrl).toPromise().then(res => this.listDistrict = res as District[])
  }

  // getDistrictsByFkCityId(id: number): any {
  //   return this.http
  // }
}
