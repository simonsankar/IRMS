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
      address: report.address,
      icon: iconPath,
      latitude: report.latitude,
      longitude: report.longitude,
      status: report.status,
      date: report.date,
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
  geoCode(address) {
    console.log('Getting Address: ', address);
    let geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
      geocoder.geocode({ 'address': address}, function(results, status) {
        if (status == 'OK') {
            observer.next(results[0].geometry.location);
            observer.complete();
        } else {
            console.log('Error - ', results, ' & Status - ', status);
            observer.next({});
            observer.complete();
        }
      });
    })
  }
  //Reverse Geocoding
  reverseGeoCode(marker)  {
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(marker.latitude, marker.longitude);
    return Observable.create(observer => {
      geocoder.geocode({'latLng':latlng}, (results, status) => {
        if(status == 'OK') {
          observer.next(results[0].formatted_address);
          observer.complete();
        }
        else {
            console.log('Error - ', results, ' & Status - ', status);
            observer.next({});
            observer.complete();
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
  address:string,
  icon: string,
  latitude: number,
  longitude: number,
  status: number,
  date:string,
  image: string,
  isOpen: boolean,
}
