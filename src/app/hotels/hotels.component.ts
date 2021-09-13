import { Component, OnInit, TemplateRef } from '@angular/core';
import { HotelDetail } from '../hotel-detail.model';
import { HotelService } from '../hotel-service/hotel.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  hotels !: HotelDetail[];
  selectedHotel !: HotelDetail;

  isCollapsed: boolean = true;
  isClicked: boolean = false;

  modalRef !: BsModalRef;
  message !: string;

  constructor(public hotelService: HotelService, private toastr: ToastrService, private modalService: BsModalService) { }

  toggleCollapse2() {
    this.isClicked = true;
    this.isCollapsed = true;
  }

  toggleCollapse() {
    this.isCollapsed = false;
  }

  ngOnInit(): void {
    this.hotelService.getAllHotels();
  }

  formuDoldur(secilmisKayit: HotelDetail) {
    debugger
    this.hotelService.formDataHotel = Object.assign({}, secilmisKayit);
    console.log(this.hotelService.formDataHotel);
  }

  // onDelete(id: number) {
  //   if (confirm('Kayıdı silmek istediğinize emin misiniz?')) {
  //     this.hotelService.deleteHotel(id).subscribe(
  //       res => {
  //         this.hotelService.getAllHotels();
  //         this.toastr.error("Kayıt başarıyla silindi.");
  //       },
  //       err => { console.log(err) });
  //   }
  // }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm modal-dialog-centered' });
  }

  confirm(id: number): any {
    this.hotelService.deleteHotel(id).subscribe(
      res => {
        this.hotelService.getAllHotels();
        this.toastr.error("Kayıt başarıyla silindi.");
        // this.message = 'Confirmed!';
        this.modalRef.hide();
      },
      err => { console.log(err) });
  }

  decline(): void {
    // this.message = 'Declined!';
    this.modalRef.hide();
  }
}
