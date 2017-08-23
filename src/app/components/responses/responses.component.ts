import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { fadeInAnimation } from '../../animations/fade-in.animation';
import { PageHeaderComponent } from '../page-header/page-header.component';
@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css'],
  // make fade in animation available to this component
  animations: [fadeInAnimation],
  // attach the fade in animation to the host (root) element of this component
  host: { '[@fadeInAnimation]': '' }
})
export class ResponsesComponent implements OnInit {
  title: string = 'Responses';
  reports:any[] =[];

  //Filter Panel
  categories:any[];
  regions:any[];
  selectedCategory:any;
  selectedRegion:any;
  
  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.loadRegions();
    this.loadReports({});
  }

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

  loadReports(query) { //Loads Reports
    this.firebaseService.getReports(query).subscribe(reports => { 
      if(this.selectedRegion.$key != 0){  //Check if filter is needed: (region)
        reports = reports.filter(value => value.region == this.selectedRegion.name);  //Filter by region and update list        
      }
      
      reports.forEach(report => {
        report.active = ''; //Add active property
        this.firebaseService.getResponses(report.$key) //Get responses
        .subscribe(responses => {
          responses.forEach(res => {
            res.view = false;
          });
          report.responses = responses;
        });
        this.reports = reports;
        
      });
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

    clickReport(report) { //Clicked a report
      console.log('Clicked:',report.title);
      if(report.active=='')
        report.active ='active';
      else report.active = '';
    }
    
    clickResponse(response) { //CLicked response
      console.log('Clicked:',response);
      setTimeout(() => {
        response.view = !response.view;
      },200)
    }

    makeResponse(id) {
      this.router.navigate(['/makeresponse/'+id]);
    }


}
