import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Deneme Projesi';
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) { }

   loggedIn() {
     const token = localStorage.getItem("token");
    return token ? true : false;
   }

  ngOnInit() {
    const token = localStorage.getItem("token");
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    
    }
  }

  // name: string = "Sefa";

  // isim = new FormControl('');

  // updateName() {
  //   this.isim.setValue('Nancy');
  // }

  // profileForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  // });

  // onSubmit() {
  //   // TODO: Use EventEmitter with form value
  //   console.warn(this.profileForm.value);
  // }
}
