import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../../services/firebase.service'
import { LocalstorageService } from '../../../../services/localstorage.service';
import { MapsService } from '../../../../services/maps.service';

@Component({
  selector: 'app-reportsummary',
  templateUrl: './reportsummary.component.html',
  styleUrls: ['./reportsummary.component.css']
})
export class ReportsummaryComponent implements OnInit {
  width = 100;  //Progress bar
  //Details
  title:any;
  category:any;
  description:any;
  //Location
  region:any;
  address:any;
  //Photo
  photo:string;
  // Map Properties
  zoom: number = 12;
  baselat: number;
  baselng: number;
  iconBase: string = '../../../../../assets/images/';
  newm = {
    latitude:0,
    longitude:0,
    icon: this.iconBase+'new.png',
  };
  //Indicators
  titleInput = 'has-success';
  categorySelect = 'has-success';
  descriptionInput = 'has-success';
  regionSelect = 'has-success';
  addressInput = 'has-success';
  constructor(private fb: FirebaseService, private ls:LocalstorageService, private mapService: MapsService, private router: Router) { }

  ngOnInit() {
    this.loadReport();
  }

  loadReport() {
    let details =  this.ls.getDetails();
    let location = this.ls.getLocation();
    let photoStatus = +this.ls.getPhotoStatus()
    
    this.title = details.title;
    this.category = details.category;
    this.description = details.description;
    this.region = location.region;
    this.newm.latitude = +location.lat;
    this.newm.longitude = +location.lng;
    this.baselat = +this.newm.latitude
    this.baselng = +this.newm.longitude;
    this.address = location.address;
    if(photoStatus) {
      this.photo = this.ls.getPhoto();
    }
  }

  submitReport() {
    let report = {
      title : this.title,
      category: this.category,
      description: this.description,
      region: this.region,
      address: this.address,
      latitude: this.newm.latitude,
      longitude: this.newm.longitude,
      status:0,
      responses: [],
      date:new Date().toDateString(),
    }
    if(this.photo)
      this.fb.addReport(report,this.photo);
    else this.fb.addReport(report,0);
    this.router.navigate(['/reports']);
    this.ls.clear();
  }

  cancelReport() {
    this.ls.clear();
    this.router.navigate(['/reports']); //Route to summary
  }

  
}
