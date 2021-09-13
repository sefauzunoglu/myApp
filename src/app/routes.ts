import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { HotelEditComponent } from "./hotel-edit/hotel-edit.component";
import { HotelsComponent } from "./hotels/hotels.component";
import { LoginComponent } from "./login/login.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from "./_guards/auth.guard";

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'hotels', component: HotelsComponent, canActivate: [AuthGuard] },
  { path: 'hoteledit', component: HotelEditComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotfoundComponent }
];
