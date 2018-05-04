import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';


//COMPONENTS
import { AppComponent } from './app.component';

//MODULES
import { CoreModule } from './core/core.module';


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
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(fbConfig),
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})



export class AppModule { }
