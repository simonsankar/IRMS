import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ResponsesComponent } from './components/responses/responses.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StatsComponent } from './components/stats/stats.component';
import { MakereportComponent } from './components/makereport/makereport.component';
import { NewreportComponent } from './components/makereport/partials/newreport/newreport.component';
import { ReportdetailsComponent } from './components/makereport/partials/reportdetails/reportdetails.component';
import { ReportlocationComponent } from './components/makereport/partials/reportlocation/reportlocation.component';
import { ReportphotoComponent } from './components/makereport/partials/reportphoto/reportphoto.component';
import { ReportsummaryComponent } from './components/makereport/partials/reportsummary/reportsummary.component';
import { MakeresponseComponent } from './components/makeresponse/makeresponse.component';

const appRoutes: Routes = [
  { path:'',component: HomeComponent },
  { path:'404', component: PagenotfoundComponent },
  { path:'reports', component: ReportsComponent },
  { path:'responses', component: ResponsesComponent },
  { path:'stats', component: StatsComponent },
  { path:'makereport',component: MakereportComponent, children: [
      { path:'', pathMatch: 'full', redirectTo: 'newreport' },
      { path: 'newreport', component: NewreportComponent },
      { path: 'details', component: ReportdetailsComponent },
      { path: 'location', component: ReportlocationComponent },
      { path: 'photo', component: ReportphotoComponent },
      { path: 'summary', component: ReportsummaryComponent },
  ] },
  { path:'makeresponse', component: MakeresponseComponent },
  { path:'makeresponse/:id', component: MakeresponseComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }