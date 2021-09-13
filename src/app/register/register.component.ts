import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      debugger
      console.log("Kullanıcı Oluşturuldu");
      this.router.navigate(['/login']); // eğer kullanıcı oluşturma başarılı olursa login sayfasına yönlendir
      const username = this.model[3];
      console.log(username);
    }, error => {
      console.log(error);
    }
    );
  }
}
