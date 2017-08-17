import { Injectable } from '@angular/core';

@Injectable()
export class LocalstorageService {

  constructor() { }
  //Clear
  clear() {
    localStorage.clear();
  }

  //Details
  setDetails(title,category,description) {
    this.setTile(title);
    this.setCategory(category);
    this.setDescription(description);
  }
  getDetails() {
    let details = {
      title: this.getTitle(),
      category: this.getCategory(),
      description: this.getDescription()
    }
    return details;
  }
  setTile(title:string) {
    localStorage.setItem('title',title);
  }
  getTitle() {
    return localStorage.getItem('title');
  }

  setCategory(category) {
    localStorage.setItem('category',category);
  }
  getCategory() {
    return localStorage.getItem('category');
  }

  setDescription(description) {
    localStorage.setItem('description',description);
  }
  getDescription()  {
    return localStorage.getItem('description');
  }

  //Location
  setLocation(lat,lng,address,region) {
    this.setAddress(address);
    this.setCoords(lat,lng);
    this.setRegion(region);
  }
  getLocation() {
    let location = {
      address : this.getAddress(),
      lat: this.getCoords().lat,
      lng: this.getCoords().lng,
      region: this.getRegion()
    }
    return location;
  }
  
  setRegion(region) {
    localStorage.setItem('region',region)
  }
  getRegion() {
    return localStorage.getItem('region');
  }

  setCoords(lat,lng) {
    localStorage.setItem('lat',lat);
    localStorage.setItem('lng',lng);
  }
  getCoords() {
    let coords = {
      lat: localStorage.getItem('lat'),
      lng: localStorage.getItem('lng')
    }
    return coords;
  }

  setAddress(address) {
    localStorage.setItem('address',address);
  }
  getAddress() {
    return localStorage.getItem('address');
  }

  //Photo
  setPhoto(photo) {
    localStorage.setItem('photo',photo);
  }
  getPhoto() {
    return localStorage.getItem('photo');
  }
  removePhoto() {
    localStorage.removeItem('photo');
  }
  setPhotoStatus(num) {
    localStorage.setItem('photoStatus',num);
  }
  getPhotoStatus() {
    return localStorage.getItem('photoStatus');
  }
}
