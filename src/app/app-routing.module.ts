import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginsuccessComponent } from './loginsuccess/loginsuccess.component';
import { ResgistrationComponent } from './resgistration/resgistration.component';
import { TransciverComponent } from './transciver/transciver.component';
import { AuthGuard } from './guards/auth.guard';
import { SmsListComponent } from './sms-list/sms-list.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { ProfilComponent } from './profil/profil.component';
import { UsersComponent } from './users/users.component';
import { UserlistComponent } from './users/userlist/userlist.component';
import { UserComponent } from './users/user/user.component';

import { HomeComponent } from './_security/home/home.component';
import { RegisterComponent } from './_security/register/register.component';
import { ProfileComponent } from './_security/profile/profile.component';
import { BoardUserComponent } from './_security/board-user/board-user.component';
import { BoardAdminComponent } from './_security/board-admin/board-admin.component';
import { CompagneComponent } from './compagne/compagne.component';
//import { LoginComponent } from './_security/login/login.component';



const routes: Routes = [
 
  {path:'loginsuccess' , component:LoginsuccessComponent, canActivate : [AuthGuard] },
  
  {path:'sms' , component:TransciverComponent, canActivate : [AuthGuard]},
  {path:'smslist' , component:SmsListComponent, canActivate : [AuthGuard]},
  {path:'profil' , component:ProfilComponent, canActivate : [AuthGuard]},
  {path:'users' , component:UsersComponent, canActivate : [AuthGuard]},

  {path:'' , component:LoginComponent},
  {path:'registration' , component:ResgistrationComponent},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
  {path:'multiplesend' , component:CompagneComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
