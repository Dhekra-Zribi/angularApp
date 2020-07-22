import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ResgistrationComponent } from './resgistration/resgistration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginsuccessComponent } from './loginsuccess/loginsuccess.component';
import { TransciverComponent } from './transciver/transciver.component';
import { AuthGuard } from './guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { SmsListComponent } from './sms-list/sms-list.component';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StatistiqueComponent } from './statistique/statistique.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { ProfilComponent } from './profil/profil.component';

import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { UserlistComponent } from './users/userlist/userlist.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterComponent } from './_security/register/register.component';
import { HomeComponent } from './_security/home/home.component';
import { ProfileComponent } from './_security/profile/profile.component';
import { BoardAdminComponent } from './_security/board-admin/board-admin.component';
import { BoardUserComponent } from './_security/board-user/board-user.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { CommonModule } from '@angular/common';
import { CompagneComponent } from './compagne/compagne.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResgistrationComponent,
    LoginsuccessComponent,
    TransciverComponent,
    SmsListComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    StatistiqueComponent,
    ProfilComponent,
    UserComponent,
    UsersComponent,
    UserlistComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    CompagneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    Ng2SearchPipeModule,
    NgApexchartsModule,
    CommonModule
    
    

  ],
 // providers: [AuthGuard],
 providers: [authInterceptorProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
