import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AdminModuleModule } from '../admin/admin-module.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


//COMPONENTS
import { HeaderComponent } from './components/header/header.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';


//SERVICES
import { AuthService } from "./services/auth-service/auth.service";
import { AuthGuard } from './services/auth-guard/auth.guard';

const fbConfig = {
  apiKey: "AIzaSyC5CH78IBS77fdx3sgAbXBAv4pEeAT3Zrg",
  authDomain: "oddsapp-58256.firebaseapp.com",
  databaseURL: "https://oddsapp-58256.firebaseio.com",
  projectId: "oddsapp-58256",
  storageBucket: "oddsapp-58256.appspot.com",
  messagingSenderId: "344358156690"
};

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AdminModuleModule,
    FormsModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  declarations: [HeaderComponent, PagenotfoundComponent, LoginComponent, RegisterComponent, HomeComponent],
  exports: [
    RouterModule,
    HeaderComponent
  ]
})
export class CoreModule {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
