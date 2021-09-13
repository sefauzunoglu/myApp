import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AreaService } from '../city-district-service/area.service';
import { HotelDetail } from '../hotel-detail.model';
import { HotelService } from '../hotel-service/hotel.service';
import { City } from '../models/city';
import { District } from '../models/district';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})

export class HotelDetailsComponent implements OnInit {

  //selectedCity: City = new City();
  cities: City[] = [];
  // districts: District[] = [];

  responseCity: City[] = [];
  responseDisricts: District[] = [];

  constructor(public areaService: AreaService, public hotelService: HotelService, private toastr: ToastrService, public router: Router) { }


  ngOnInit(): void {
    this.areaService.getDistricts();
    console.log();
  }

  onOptionsSelected(city: string) {
    this.responseCity = [];
    this.responseDisricts = [];
    const cityList = this.areaService.listCity;
    const list = this.areaService.listDistrict;
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

  onSubmit(form: NgForm) {
    this.updateRecord(form);
    this.router.navigate(['/hotels']);
  }

  updateRecord(form: NgForm) {
    this.hotelService.putHotel().subscribe(
      res => {
        this.resetForm(form);
        this.hotelService.getAllHotels();
        this.toastr.info('Kayıt Başarıyla Güncellendi!');
      },
      err => { console.log(err); }
    )
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.hotelService.formDataHotel = new HotelDetail();
  }
}
