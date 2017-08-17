import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../../services/localstorage.service';

@Component({
  selector: 'app-reportphoto',
  templateUrl: './reportphoto.component.html',
  styleUrls: ['./reportphoto.component.css']
})
export class ReportphotoComponent implements OnInit {
  width = 75; //Progress bar
  uploadPhoto:any;
  photo:any = '../../../../../assets/images/placeholder.png';
  //Indicators
  photoStatus:any = 0;
  photoSelectText = 'No photo selected.';
  photoSelect = 'has-warning'

  constructor(private ls: LocalstorageService, private router: Router) { }

  ngOnInit() {
    this.loadPhoto();
  }
  
  

  onChange(fileInput: any){ //On any file select, upload Base64 string to Local storage
    let reader = new FileReader(); //Reads file

    reader.onload = (event: any) => {
      console.log(event);
      this.photoStatus = 1;
      this.photoSelect = 'has-success';
      this.photoSelectText = 'Photo has been selected.'
      this.photo = event.target.result; //Photo source
      // console.log('Your photo:\n',this.photo);
    }
    reader.readAsDataURL(fileInput.target.files[0]);
  }

  unselectPhoto() { //Removes photo from Local storage, updates Indicators accordingly
    console.log('Photo removed.');
    this.ls.removePhoto();
    this.photo = '../../../../../assets/images/placeholder.png';
    this.photoSelectText = 'No photo selected.';
    this.photoSelect = 'has-warning'  
    this.photoStatus = 0;
    this.reset(); //reset input field
  }

  loadPhoto() { //Loads photo if available
    if(+this.ls.getPhotoStatus()) {
      this.photo = this.ls.getPhoto(); 
      this.photoSelect = 'has-success';
      this.photoSelectText = 'Photo has been selected.';
      this.photoStatus = +this.ls.getPhotoStatus();
    }
  }

  savePhoto() { //Saves photo to Local storage and routes to summary
    if(this.isValid()) {
      this.ls.setPhoto(this.photo);
      this.ls.setPhotoStatus(this.photoStatus);      
    } else this.ls.setPhotoStatus(0); //No photo
    
    this.router.navigate(['/makereport/summary']); //Route to summary
  }

  isValid() { //Checks for photo stored
    if(this.photoStatus)
      return 1;
    return 0;
  }

  @ViewChild('form') form;

  //Reset input field
  reset() {
    this.form.nativeElement.reset()
  }
}
