import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';     
import { Router } from '@angular/router';
import { FirebaseService } from '../../../../services/firebase.service';          
import { MapsService } from '../../../../services/maps.service';
import { LocalstorageService } from '../../../../services/localstorage.service';

@Component({
  selector: 'app-reportlocation',
  templateUrl: './reportlocation.component.html',
  styleUrls: ['./reportlocation.component.css']
})
export class ReportlocationComponent implements OnInit {
    width = 50; //Progress bar
    regions:any[] = []; //Holds regions
    selectedRegion:any;
    address:any='';
    //Indicators
    regionSelect = '';
    addressInput = '';

    // Map Properties
    zoom: number = 9;
    baselat: number = 10.439958;
    baselng: number = -61.298195;
    iconBase: string = '../../../../../assets/images/';
    newm = {
      latitude:10.439958,
      longitude:-61.298195,
      icon: this.iconBase+'new.png',
      draggable: true,
    };

  constructor(
    private ls:LocalstorageService, 
    private firebaseService :FirebaseService, 
    private mapService:MapsService, 
    private router:Router
  ) { }

  ngOnInit() {
    this.loadRegions()
    this.loadOtherDetails();
  }

  loadRegions() { //Loads Regions in select
    this.firebaseService.getRegions().subscribe(regions => {
      this.regions = regions;
      let rname = this.ls.getRegion()
      if(rname) {
        this.selectedRegion = this.regions.find(r => r.name == rname);
      } else this.selectedRegion = this.regions[0];

      console.log('Regions:\n',this.regions);
      console.log('Defaults to:',JSON.stringify(this.selectedRegion));      
    });
  }
  loadOtherDetails() {
    let address = this.ls.getAddress();
    let coords = this.ls.getCoords();
    if(address) {
      console.log(address);
      this.address = address;
    }
    if(coords) {
      console.log(coords);
      this.newm.latitude = +coords.lat;
      this.newm.longitude = +coords.lng;
    }
  }

  //Marker Functions
  addNewMarker($event: any) { //Adds a marker by clicking on map as well as adds the address
    this.newm.latitude = $event.coords.lat;
    this.newm.longitude = $event.coords.lng;
    console.log(this.newm);
    this.mapService.reverseGeoCode(this.newm).subscribe(address => {  //Update Address when marker is added by clicking
      this.address = address;
    });
  }

  draggedMarker($event: any) {  //Updates coords of marker as well as corresponding address
    this.newm.latitude = $event.coords.lat;
    this.newm.longitude = $event.coords.lng;
    console.log(this.newm);
    this.mapService.reverseGeoCode(this.newm).subscribe(address => {  //Update Address when marker is added by clicking
      this.address = address;
    });
  }

  //Positioning Functions
  getUserLocation() {
   this.mapService.getCurrentLocation().subscribe(position => {
      console.log(position);
      this.newm.latitude = position.coords.latitude;
      this.newm.longitude = position.coords.longitude;

      this.mapService.reverseGeoCode(this.newm).subscribe(address => {
        this.address = address;
      });
    });
    
  }
  geocodeAddress() { //Geocodes a given address
    if(this.address){
      this.mapService.geoCode(this.address+', Trinidad and Tobago').subscribe(position => {
        this.newm.latitude = position.lat();
        this.newm.longitude = position.lng();
        console.log('Marker updated: ',JSON.stringify(this.newm));
      });
    }
  }

  saveLocation()  { //Saves location and routes to photo section
    if(this.isValid()) {
      console.log('Valid');
      this.ls.setLocation(this.newm.latitude,this.newm.longitude,this.address,this.selectedRegion.name);
      this.router.navigate(['/makereport/photo']);
    }
    else{
      alert('Fix your mistakes!');
    }
  }
  
  isValid() {
    let err = 0;
    if(this.selectedRegion.$key == 0){
      err++;
      this.regionSelect = 'has-error';
    } else this.regionSelect = 'has-success';
    if(!this.address){
      err++;
      this.addressInput = 'has-error';
    } else this.addressInput = 'has-success';
    
    if(err>0){
      console.log('Errors: ',err);
      return 0; //Invalid
    } else return 1;
  }

}
