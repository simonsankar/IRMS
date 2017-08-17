import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; //Router
import { FirebaseService } from '../../../../services/firebase.service';
import { LocalstorageService } from '../../../../services/localstorage.service'

@Component({
  selector: 'app-reportdetails',
  templateUrl: './reportdetails.component.html',
  styleUrls: ['./reportdetails.component.css']
})
export class ReportdetailsComponent implements OnInit {
  width = 25; //Progress bar
  categories: any[] = []; //Holds the categories 
  selectedCategory: any;  //default category (all)
  title:string;
  description:string;
  //Indicators
  categorySelect = '';
  titleInput = '';
  descriptionInput = '';

  constructor(
    private ls: LocalstorageService, 
    private firebaseService: FirebaseService, 
    private router:Router
  ) { }

  ngOnInit() {
    this.loadCategories(); //Retrieves all categories, and may set category
    this.loadOtherDetails();  //Retrieves other details if available
  }

  loadCategories() { //Loads Categories in select
    this.firebaseService.getCategories().subscribe(categories => {
      this.categories = categories;
      let cname = this.ls.getCategory(); 
      console.log('cname:',cname);
      if(cname){
        this.selectedCategory = this.categories.find(c => c.name == cname);
      }
      else
        this.selectedCategory = this.categories[0];
  
      console.log('Categories',this.categories)
      console.log('Defaults to:',JSON.stringify(this.selectedCategory));
    });
  }

  loadOtherDetails() {  //Loads other details if availble in local storage
    let title = this.ls.getTitle();
    let description = this.ls.getDescription();
    if(title){
      this.title = title;
    }
    if(description){
      this.description = description;
    }
  }
  
  saveDetails() { //Saves the details to local storage
    console.log(this.selectedCategory.name,this.title,this.description);
    if(this.isValid())  {
      this.ls.setDetails(this.title,this.selectedCategory.name,this.description);
      this.router.navigate(['/makereport/location']);
    }
    else
      alert('Fix it dummy!');
  }
  cancel() {  //Cancels report, return to reports, clears LS
    this.ls.clear();
  }

  //Validation
  isValid() {
    let err=0;
    if(!this.title){
      err++;
      this.titleInput = 'has-error';
    } else this.titleInput = 'has-success';
    if(this.selectedCategory.$key == 0){
      err++;
      this.categorySelect = 'has-error';
    } else this.categorySelect = 'has-success';
    
    if(!this.description){
      err++;
      this.descriptionInput = 'has-error';
    } else this.descriptionInput = 'has-success'; 

    if(err>0) {
      console.log('Error(s)',err);
      return 0; //Invalid
    }
    else{
      return 1; //Valid
    }
  }
  

}
