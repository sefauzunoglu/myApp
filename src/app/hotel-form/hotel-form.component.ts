import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AreaService } from '../city-district-service/area.service';
import { HotelDetail } from '../hotel-detail.model';
import { HotelService } from '../hotel-service/hotel.service';
import { City } from '../models/city';
import { District } from '../models/district';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css']
})
export class HotelFormComponent implements OnInit {

  responseCity: City[] = [];
  responseDisricts: District[] = [];

  constructor(public areaService: AreaService, public hotelService: HotelService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.areaService.getCities();
    this.areaService.getDistricts();
  }

  onOptionsSelected(city: string) {
    this.responseCity = [];
    this.responseDisricts = [];
    const cityList = this.areaService.listCity;
    const list = this.areaService.listDistrict;
    //this responseCity içerisindeki cityId ile list içerisindeki fk_City_Id eşitse push et
    cityList.forEach(x => {
      if (x.cityName == city) {
        this.responseCity.push(x);
        this.responseCity.forEach(y => {
          list.forEach(element => {
            if (element.fk_City_Id == y.cityId) {
              this.responseDisricts.push(element);
            }
          });
        });
      }
    });
  }

  // onOptionsSelected2(id: number) {
  //   debugger
  //   this.responseDisricts = [];
  //    this.responseDisricts = this.areaService.getDistricts(event);
  //    const list = this.areaService.listDistrict;
  //    list.forEach(element => {
  //      if (element.fk_City_Id == id) {
  //        this.responseDisricts.push(element)
  //      }
  //    });
  // }

  onSubmit(form: NgForm) {
    this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    this.hotelService.postHotel().subscribe(
      res => {
        this.resetForm(form);
        this.hotelService.getAllHotels();
        this.toastr.success('Kayıt Başarıyla Eklendi!');
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.hotelService.formDataHotel2 = new HotelDetail();
  }
}
