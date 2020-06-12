import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginsuccessComponent } from './loginsuccess/loginsuccess.component';
import { ResgistrationComponent } from './resgistration/resgistration.component';
import { TransciverComponent } from './transciver/transciver.component';


const routes: Routes = [
  {path:'' , component:LoginComponent},
  {path:'loginsuccess' , component:LoginsuccessComponent},
  {path:'registration' , component:ResgistrationComponent},
  {path:'login' , component:LoginComponent},
  {path:'sms' , component:TransciverComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
