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

}
