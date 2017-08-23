import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../page-header/page-header.component';

@Component({
  selector: 'app-makereport',
  templateUrl: './makereport.component.html',
  styleUrls: ['./makereport.component.css']
})
export class MakereportComponent implements OnInit {
  title: string = 'Make A Report';
  
  constructor() { }

  ngOnInit() {
  }

}
