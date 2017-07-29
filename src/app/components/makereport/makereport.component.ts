import { Component, OnInit } from '@angular/core';

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
