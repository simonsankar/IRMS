import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PageHeaderComponent } from '../page-header/page-header.component';

@Component({
  selector: 'app-manage-reports',
  templateUrl: './manage-reports.component.html',
  styleUrls: ['./manage-reports.component.css']
})
export class ManageReportsComponent implements OnInit {
  title:string = 'Manage Reports';
  reports:any;

  constructor(private firebaseService: FirebaseService, private flash: FlashMessagesService) { }

  ngOnInit() {
    this.loadReports({});
  }

  loadReports(query) {
    this.firebaseService.getReports(query).subscribe(reports => {
      reports.forEach(report => {
        report.view = false;
        report.active = '';
      });
      this.reports = reports;
    });
  }

  viewReport(report) {
    console.log('Clicked:',report);
    setTimeout(() => {
      report.view = !report.view
      if(report.active =='active')
        report.active = '';
      else report.active = 'active';
    },200)
  }

  deleteReport(report) {
    this.flash.show('Report Deleted!',{cssClass:'alert-danger',timeout:3000});
    this.firebaseService.deleteReport(report.$key);
  }

}
