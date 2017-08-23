import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';     //All A4 main stuff
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //Form related stuff 'reactive forms'
import { HttpModule } from '@angular/http';   //Http stuff for all types of requests
import { RouterModule, Routes } from '@angular/router'; //Routing functionality
import { AngularFireModule } from 'angularfire2';       //Angular4 & Firebase main module
import { AngularFireDatabaseModule } from 'angularfire2/database'; //AngularFire database section
import { AngularFireAuthModule } from 'angularfire2/auth';         //AngularFire auth section
import { FlashMessagesModule } from 'angular2-flash-messages'
import { ModalModule } from "ngx-modal";  //Modal and angular
import { AgmCoreModule } from '@agm/core';                         // Angular4 & GoogleMaps module
import { AppRoutingModule }        from './app-routing.module';    //Routing config for app

import { environment } from '../environments/environment';         //Environment variables.. for angularfire
import { FirebaseService } from './services/firebase.service';     //My Firebase service to handle data transfer
import { AuthService } from './services/auth.service';
import { MapsService } from './services/maps.service';             //My Map service.. AGM
import { LocalstorageService } from './services/localstorage.service';

import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ResponsesComponent } from './components/responses/responses.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StatsComponent } from './components/stats/stats.component';
import { FooterComponent } from './components/footer/footer.component';
import { MakereportComponent } from './components/makereport/makereport.component';
import { ReportdetailsComponent } from './components/makereport/partials/reportdetails/reportdetails.component';
import { ReportlocationComponent } from './components/makereport/partials/reportlocation/reportlocation.component';
import { ReportphotoComponent } from './components/makereport/partials/reportphoto/reportphoto.component';
import { ReportsummaryComponent } from './components/makereport/partials/reportsummary/reportsummary.component';
import { NewreportComponent } from './components/makereport/partials/newreport/newreport.component';
import { MakeresponseComponent } from './components/makeresponse/makeresponse.component';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ManageReportsComponent } from './components/manage-reports/manage-reports.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReportsComponent,
    ResponsesComponent,
    NavbarComponent,
    StatsComponent,
    FooterComponent,
    MakereportComponent,
    ReportdetailsComponent,
    ReportlocationComponent,
    ReportphotoComponent,
    ReportsummaryComponent,
    NewreportComponent,
    MakeresponseComponent,
    PagenotfoundComponent,
    ManageCategoriesComponent,
    ManageReportsComponent,
    PageHeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule, //My router config module
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    ModalModule, //importing modal module
    FlashMessagesModule,
    AgmCoreModule.forRoot({ //Angular Google Maps
      apiKey: 'AIzaSyCJyeFvNVp6meRRfkEJ8xxdFoIX0aBvpJ8'
    }),
  ],
  providers: [FirebaseService, AuthService, MapsService, LocalstorageService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }