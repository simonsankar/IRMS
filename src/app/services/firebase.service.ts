import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseService {
  reports: FirebaseListObservable<any[]>;
  regions: FirebaseListObservable<any[]>;
  categories: FirebaseListObservable<any[]>;

  constructor(private af: AngularFireDatabase) { 
  }

  // getReports() {  //Retrieves all reports TODO: query db based on region and category
  //   this.reports = this.af.list('/reports') as FirebaseListObservable <Report[]>;    
  //   return this.reports;
  // }
 

  getReports(query) {
    this.reports = this.af.list('/reports', query) as FirebaseListObservable <Report[]>;
    return this.reports;
  }

  getRegions() {  //Retrieves regions
    this.regions = this.af.list('/regions') as FirebaseListObservable <Region[]>;
    return this.regions; 
  }

  getCategories() { //Retrieves categories
    this.categories = this.af.list('/categories') as FirebaseListObservable <Category[]>;
    return this.categories
  }
}

interface Report { //Defines a Report
  $key: string,
  title: string,
  description: string,
  latitude: number,
  longitude: number,
  status: number,
  image: string
}

interface Region {
  $key: string,
  name: string,
}

interface Category {
  $key: string,
  mame: string,
}
