import { Component, OnInit, ElementRef } from '@angular/core';
import { FirebaseService } from '../../../../services/firebase.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  categories:any[];
  regions:any[];
  selectedCategory:any;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.loadRegions();
    this.loadCategories();
    this.loadData({});
    
    
  }
  // Chart
  
  
  loadCategories() { //Loads Categories in select
    this.firebaseService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.selectedCategory = this.categories[0];
      console.log('Categories',this.categories)
      console.log('Defaults to:',JSON.stringify(this.selectedCategory));
    });
  }

  loadRegions() { //Loads Regions in select
    this.firebaseService.getRegions().subscribe(regions => {
      this.regions = regions;
      console.log('Regions:\n',this.regions);
    });
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

  onChange() { //Updates list based on the combo selected: (category,region)
    console.log('Category to get:', this.selectedCategory.name);
    this.loadData(this.createQuery());       
  }
  loadData(q) {

  }
  

     
}

