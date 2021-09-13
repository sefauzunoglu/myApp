import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HotelDetail } from '../hotel-detail.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  // formDataHotel: Hotel = new Hotel();
  formDataHotel: HotelDetail = new HotelDetail();
  formDataHotel2: HotelDetail = new HotelDetail();
  readonly baseUrl = "http://localhost:61834/api/testDetails";
  list: Array<HotelDetail> = [];

  constructor(private http: HttpClient) { }

  getAllHotels() {
    /*this.http.get<Array<HotelDetail>>(this.baseUrl).subscribe(res => {
       this.list = res as HotelDetail[]
     },
       error => { console.log(error) })*/

    this.http.get(this.baseUrl)
      .toPromise()
      .then(res => this.list = res as HotelDetail[])

  }

  postHotel() {
    // return this.http.post(this.baseUrl, this.formDataHotel2);
    return this.http.post(`${this.baseUrl}`, this.formDataHotel2);
  }

  putHotel() {
    return this.http.put(`${this.baseUrl}/${this.formDataHotel.hotelId}`, this.formDataHotel);
  }

  deleteHotel(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
