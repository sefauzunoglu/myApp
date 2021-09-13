import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HotelDetail } from '../hotel-detail.model';
import { HotelService } from '../hotel-service/hotel.service';
import { City } from '../models/city';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit {

  cities: City[] = [];

  constructor(public hotelService: HotelService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
    this.hotelService.putHotel().subscribe(
      response => {
        this.resetForm(form);
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
