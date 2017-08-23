import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FirebaseService } from '../../services/firebase.service';
import { MapsService } from '../../services/maps.service';
import { PageHeaderComponent } from '../page-header/page-header.component'
@Component({
  selector: 'app-makeresponse',
  templateUrl: './makeresponse.component.html',
  styleUrls: ['./makeresponse.component.css']
})
export class MakeresponseComponent implements OnInit {
  title: string = 'Make a Response';

  //Report Panel/Filter
  reports: any[];
  report: any = null;
  responses: any[];
  response:any = {
    title:'',
    description:'',
    date:new Date().toDateString()
  };
  //Response Selected/Form
  iconBase: string = '../../../assets/images/'
  categories: any[] = []; //Holds the categories 
  regions: any[] = [];//Holds the regions
  selectedCategory: any;  //default category (all)
  selectedRegion: any;    //defualt region (all)
  statuses:any[] = [1,2];
  selectedStatus:any = this.statuses[0];

  //Preselected Report
  id: string;

  constructor(
    private flash: FlashMessagesService,
    private firebaseService: FirebaseService, 
    private mapService: MapsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    
    
    if(this.checkParams()){
      console.log('We had params');
    } else{
      this.loadRegions();
      this.loadCategories();
      this.loadReports({});
    }
  }

  //Preselected Responding
  checkParams() {
    this.id = this.route.snapshot.params['id'];
    if(this.id) {
      console.log(this.id);
      this.getSelectedReport(this.id);
      return 1;
    }
    return 0;
  }
  getSelectedReport(id) {
    this.firebaseService.getReport(id).subscribe(report => {
      console.log(report);
      
      if(report.status == null) {
        console.log('Invalid Report');
        this.router.navigate(['/404']);
      }
      else {
        console.log('Valid Report');
        this.report = report;
      }
    });
  }

  //Default Responding

  loadRegions() { //Loads Regions in select
    this.firebaseService.getRegions().subscribe(regions => {
      this.regions = regions;
      this.selectedRegion = this.regions[0];
      console.log('Regions:\n',this.regions);
      console.log('Defaults to:',JSON.stringify(this.selectedRegion));      
    });
    }

  loadCategories() { //Loads Categories in select
    this.firebaseService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.selectedCategory = this.categories[0];
      console.log('Categories',this.categories)
      console.log('Defaults to:',JSON.stringify(this.selectedCategory));
    });
  }

  loadReports(query) {
    this.firebaseService.getReports(query).subscribe(reports => { 

      if(this.selectedRegion && this.selectedRegion.$key != 0){  //Check if filter is needed: (region)
        reports = reports.filter(value => value.region == this.selectedRegion.name);  //Filter by region and update list        
      }
      reports = reports.filter(value => value.status != 2); //Filter by incomplete reports
      reports.forEach(report => {
        report.active = '';
      });
      this.reports = reports;
      console.log('Reports:\n',this.reports);
    });
  }

  onChange() { //Updates list based on the combo selected: (category,region)
    console.log('Combo:', this.selectedCategory.name, this.selectedRegion.name);
    this.loadReports(this.createQuery());       
  }

  createQuery() { //Creates a query based on category
    if(this.selectedCategory.$key != 0){  //Category was selected
      let q = {
        query: {
          orderByChild: 'category',
          equalTo: this.selectedCategory.name
        }
      }
      return q;
    }
    return {};  //No category selected: (request all)
  }

  chooseReport(report) {
    console.log('Chose:',report);
    this.report = report;

    this.reports.forEach(report => { //Not effecient
      report.active = '';
    });
    this.report.active ='active'
  }

  //Submit new reponse
  submitResponse()  {
    console.log(this.response);
    this.firebaseService.addResponse(this.report.$key,this.response,this.selectedStatus);
    this.resetResponse();
    this.resetReports();
    if(this.id) {
      this.router.navigate(['/reports']);
    }
    this.flash.show('Response Added',
    {
      cssClass:'alert-success',
      timeout:4800 
    });
  }
  //Cancels response
  cancelResponse() {
    this.resetReports();
    this.resetResponse();
  }

  resetResponse() {
    this.response = {
      title:'',
      description:'',
      date:new Date().toDateString()
    };
  }
  resetReports() {
    this.report = null;
    if(!this.id) {
      this.reports.forEach(report => {
        report.active = '';
      });
    }
  }
}
