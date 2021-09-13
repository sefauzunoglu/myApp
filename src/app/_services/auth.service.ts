import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = "http://localhost:47144/api/user/";
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any) {
    debugger
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const result = response;
        if (result) {
          localStorage.setItem("token", result.token);
          // this.decodedToken = this.jwtHelper.decodeToken(result.token);
          // console.log(this.decodedToken);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token: any = localStorage.getItem("token");
    // return token ? true : false;
    return !this.jwtHelper.isTokenExpired(token); // eğer expired olduysa yani süresi bittiyse bize true döndürür. Tam tersini döndürmek istiyoruz.
  }
}
