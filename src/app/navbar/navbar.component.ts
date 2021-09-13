import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  time = new Date();
  model: any = {};

  constructor(public authService: AuthService, private router: Router) {
    setInterval(() => this.time = new Date(), 1000);
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.router.navigate(['/home']);
      console.log("login başarılı");
    }, error => {
      console.log("login hatalı");
    });
  }

  loggedIn() {
    // const token = localStorage.getItem("token");
    // return token ? true : false;
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem("token");
    console.log("logout");
    this.router.navigate(['/login']);
  }
}
