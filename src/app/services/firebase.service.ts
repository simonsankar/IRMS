import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {
  reports: FirebaseListObservable<any[]>;
  report: FirebaseObjectObservable<any>;
  responses: FirebaseListObservable<any[]>;
  response: FirebaseObjectObservable<any>;
  regions: FirebaseListObservable<any[]>;
  categories: FirebaseListObservable<any[]>;

  constructor(private af: AngularFireDatabase) { 
    this.getReports({});
  }

  //Reports
  addReport(report,photo) { //Add report
    // if(photo) {
    //   let storageRef = firebase.storage().ref();
    //   let reportRef = storageRef.child('/reportPhotos');
    //   reportRef.putString(photo, 'base64').then((snapshot) => {
    //     console.log('Uploaded raw Image',snapshot);
    //   });
    // }
    this.reports.push(report);
  }

  getReport(id) { //Get one report
    this.report = this.af.object('/reports/'+id) as FirebaseObjectObservable <Report>;
    return this.report;
  }

  getReports(query) { //Get all reports
    this.reports = this.af.list('/reports', query) as FirebaseListObservable <Report[]>;
        
    return this.reports;
  }

  //Responses
  addResponse(id:string,response,status) {
    this.af.object('/reports/'+id+'/status').set(status);
    this.responses = this.getResponses(id);
    this.responses.push(response);
  }
  getResponse(id:string,rid:string) { //Get one respsonse from a report
    this.response = this.af.object('/reports/'+id+'/responses') as FirebaseObjectObservable <Response>;
    return this.responses;
  }
  getResponses(id:string) { //Get all responses from a report
    this.responses = this.af.list('/reports/'+id+'/responses') as FirebaseListObservable <Response[]>;
    return this.responses;
  }

  //Regions
  getRegions() {  //Retrieves regions
    this.regions = this.af.list('/regions') as FirebaseListObservable <Region[]>;
    return this.regions; 
  }
  //Categories
  getCategories() { //Retrieves al categories
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
  date: string,
  image: string,
  responses :Response[],
}
interface Response {  //Defines a
  $key: string,
  title: string,
  description: string,
  date: string,
}
interface Region {
  $key: string,
  name: string,
}

interface Category {
  $key: string,
  mame: string,
}
