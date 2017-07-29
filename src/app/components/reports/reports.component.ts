  import { Component, OnInit } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { AgmCoreModule } from '@agm/core';
  import { FirebaseService } from '../../services/firebase.service';
  import { MapsService } from '../../services/maps.service';

  @Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css']
  })
  export class ReportsComponent implements OnInit {
    title:string = 'Reports';
    //Map Properties
    zoom: number = 9;
    baselat: number = 10.439958;
    baselng: number = -61.298195;
    iconBase: string = '../../../assets/images/';
    //Panel Properties
    markers: any[] = []; //Holds the reports info as well as marker properties
    categories: any[] = []; //Holds the categories 
    regions: any[] = [];//Holds the regions
    selectedCategory: any;  //default category (all)
    selectedRegion: any = this.regions[0];    //defualt region (all)

    constructor(private firebaseService:FirebaseService, private mapService:MapsService) { }

    ngOnInit() { 
      this.loadRegions();   //Retrieves all regions
      this.loadCategories(); //Retrieves all categories
      this.loadMarkers({}); //Retrieves all reports initially      
    }

    loadMarkers(query) { //Loads markers on map
      this.firebaseService.getReports(query).subscribe(reports => { 
        this.markers = this.mapService.createMarkerList(reports, this.iconBase); //Queries on category

        if(this.selectedRegion.$key != 0){  //Check if filter is needed: (region)
          this.markers = this.markers.filter(value => value.region == this.selectedRegion.name);  //Filter by region and update list        
          console.log(this.selectedRegion);
        }
        console.log('Markers:\n',this.markers);
      });
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

    onChange() { //Updates list based on the combo selected: (category,region)
      console.log('Combo:', this.selectedCategory.name, this.selectedRegion.name);
      this.loadMarkers(this.createQuery());       
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

    markerClick(marker) { //Marker click event
      this.mapService.markerClick(marker);
    }
    makeResponse(marker){
      // Do something
    }

  }
