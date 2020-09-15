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

import { CompagneComponent } from './compagne/compagne.component';
import { TicketComponent } from './ticket/ticket.component';
import { DetailticketComponent } from './ticket/detailticket/detailticket.component';
import { SmsRecuComponent } from './sms-recu/sms-recu.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { SettingComponent } from './setting/setting.component';



const routes: Routes = [
 
  {path:'loginsuccess' , component:LoginsuccessComponent, canActivate : [AuthGuard] },
  
  {path:'sms' , component:TransciverComponent, canActivate : [AuthGuard]},
  {path:'smslist' , component:SmsListComponent, canActivate : [AuthGuard]},
  {path:'profil' , component:ProfilComponent,canActivate : [AuthGuard]},
  {path:'users' , component:UsersComponent, canActivate : [AuthGuard]},
  
  {path:'' , component:LoginComponent},
  {path:'registration' , component:ResgistrationComponent},
  { path: 'login', component: LoginComponent },

  {path:'multiplesend' , component:CompagneComponent, canActivate : [AuthGuard]},
  
  {path:'ticket' , component:TicketComponent, canActivate : [AuthGuard]},
  {path:'detailticket' , component:DetailticketComponent, canActivate : [AuthGuard]},
  {path:'smsrecu' , component:SmsRecuComponent, canActivate : [AuthGuard]},
  {path:'drive' , component:UploadFilesComponent, canActivate : [AuthGuard]},
  {path:'setting' , component:SettingComponent, canActivate : [AuthGuard]},

  
  
  
  

 /* { path:'loginsuccess' , component:LoginsuccessComponent, canActivate : [AuthGuard], canActivateChild : [AuthGuard],
    children: [
      {path:'sms' , component:TransciverComponent},
      {path:'smslist' , component:SmsListComponent},
      {path:'users' , component:UsersComponent}
    ]  
  }*/
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
