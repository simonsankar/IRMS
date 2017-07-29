import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
  
declare var google: any;

@Injectable()
export class MapsService {
  markerList: Marker[] = [];
  position:any = {};

  constructor(private gmaps:MapsAPILoader) { }

  //Creates a marker given a report and iconBase path
  createMarker(report, iconBase) {
    let iconPath: string;  
    if(report.status == 0)
      iconPath = iconBase + 'unresolved.png';
    else if(report.status == 1)
      iconPath = iconBase + 'ongoing.png';
    else if(report.status == 2)
      iconPath = iconBase + 'resolved.png';
    else if(report.status == -1)
      iconPath = iconBase + 'new.png';
      
    let marker: Marker = {
      $key: report.$key,
      title: report.title,
      description: report.description,
      region: report.region,
      category: report.category,
      icon: iconPath,
      latitude: report.latitude,
      longitude: report.longitude,
      status: report.status,
      image: report.image,
      isOpen:false,
    }
    return marker;
  }

  //Creates a List of markers given a list of reports and an iconBase path
  createMarkerList(reports, iconBase){
    this.markerList = []; //Reset markerList
    reports.forEach(report => {
      this.markerList.push(this.createMarker(report, iconBase));
    });
    return this.markerList;
  }

  //Click function for a marker
  markerClick(marker){
    marker.isOpen = !marker.isOpen;
    console.log('I was clicked,\n' + JSON.stringify(marker));
  }

  //Geocoding an address
  geoCode(address)  {
    this.gmaps.load().then(() => {
      console.log('google script loaded');
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address':address},(results,status) => {
        if(status = 'OK') {
          console.log('OK:',results[0].geometry.location.lat());
        }
        else  {
          console.log('Geocoding failed');
        }
        
      });
    });
  }
  //User Location
  getCurrentLocation(): Observable<Position> {
    return new Observable((observer: Observer<Position>) => {
      // Invokes getCurrentPosition method of Geolocation API.
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
            observer.next(position);
            observer.complete();
        },
        (error: PositionError) => {
            console.log('Geolocation service: ' + error.message);
            observer.error(error);
        }
      );
    });
  }
  
}

interface Marker { //Defines a Marker
  $key: string,
  title: string,
  description: string,
  region: string,
  category: string,
  icon: string,
  latitude: number,
  longitude: number,
  status: number,
  image: string,
  isOpen: boolean,
}
