import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';


//COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

//MODULES
import { AuthenticationModule } from "./authentication-module/authentication.module";
import { AdminModuleModule } from "./admin/admin-module.module";
import { CoreModule } from './core/core.module';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, pathMatch: 'full'},
  { path: 'auth', loadChildren: './authentication-module/authentication.module#AuthenticationModule' },
  { path: 'admin', loadChildren: './admin/admin-module.module#AdminModuleModule' }

];

const fbConfig = {
  apiKey: "AIzaSyC5CH78IBS77fdx3sgAbXBAv4pEeAT3Zrg",
  authDomain: "oddsapp-58256.firebaseapp.com",
  databaseURL: "https://oddsapp-58256.firebaseio.com",
  projectId: "oddsapp-58256",
  storageBucket: "oddsapp-58256.appspot.com",
  messagingSenderId: "344358156690"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    CoreModule,
    AuthenticationModule,
    AdminModuleModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireModule.initializeApp(fbConfig),
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})



export class AppModule { }
