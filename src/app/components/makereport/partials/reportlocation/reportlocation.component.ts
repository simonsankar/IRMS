import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';               
import { MapsService } from '../../../../services/maps.service';

@Component({
  selector: 'app-reportlocation',
  templateUrl: './reportlocation.component.html',
  styleUrls: ['./reportlocation.component.css']
})
export class ReportlocationComponent implements OnInit {
    width = 50;
    // Map Properties
    zoom: number = 9;
    baselat: number = 10.439958;
    baselng: number = -61.298195;
    iconBase: string = '../../../../../assets/images/';
    newm = {
      latitude:null,
      longitude:null,
      icon: this.iconBase+'new.png',
      draggable: true,
    };

  constructor(private mapService:MapsService) { }

  ngOnInit() {
    
  }

  addNewMarker($event: any) {//Actually a MouseEvent but TS compiler complains
    this.newm.latitude = $event.coords.lat;
    this.newm.longitude = $event.coords.lng;
    console.log(this.newm);
  }

  getUserLocation() {
    let p = this.mapService.getCurrentLocation().subscribe(position => {
      console.log(position);
      this.newm.latitude = position.coords.latitude;
      this.newm.longitude = position.coords.longitude;
    });
  }
  geocodeAddress() {
    this.mapService.geoCode('');
  }

}
