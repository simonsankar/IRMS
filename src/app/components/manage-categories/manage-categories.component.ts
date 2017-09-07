import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {
  title:string = 'Manage Categories';
  categories:any[];
  reports:any[];
  categoryName:string;
  oldName:string[];

  constructor(private firebaseService: FirebaseService, private flash: FlashMessagesService) { }

  ngOnInit() {
    this.loadReports();
    this.loadCategories();
  }

 
  loadCategories() { //Loads Categories
    this.firebaseService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.categories = this.categories.slice(1); //Slice the default Category
      this.countReports();
      console.log('Categories',this.categories)
    });
  }

  updateCategory(category) {
    console.log("New Category:",category);
    this.reports.forEach(report => {
      if(report.category == category.old) {
        console.log('Match');
        this.firebaseService.updateReport(report.$key,category.name);
      }
    })
    this.firebaseService.updateCategoryName(category.$key,category.name);
    category.edit = true;
  }

  loadReports() { //Loads reports
    this.firebaseService.getReports({}).subscribe(reports => {
      this.reports = reports;
      console.log(this.reports);
    });
  }

  countReports() {  //Counts number of reports belonging to each category
    let tempReports = this.reports;
    if(tempReports) {
      this.categories.forEach(category => {
        category.edit = false;
        category.num = 0;
        tempReports.forEach(temp => {
          if(temp.category === category.name){
            category.num = category.num + 1;
          }
        })
      });
    }
  }

  addCategory() {
    if(this.categoryName) {
      let newCategory = {
        name: this.categoryName
      }
      this.firebaseService.addCategory(newCategory);
      console.log('Category Added');
      this.categoryName = '';
      this.flash.show('Category Added!',{
        cssClass: 'alert-success',
        timeout:2300
      });
    } else {
      console.log('Invalid Data');
    }
    
  }

  editCategory(category) {
    console.log('Edit:',category);
    category.old = category.name;
    category.edit = true;

  }
  cancelEdit(category) {
    category.name = category.old;
    category.edit = false;
  }
  
  deleteCategory(category) {
    console.log('Deleted:',category);
    this.firebaseService.deleteCategory(category.$key);
    this.flash.show('Category Deleted!',{
        cssClass: 'alert-danger',
        timeout:2300
      });
  }
}
