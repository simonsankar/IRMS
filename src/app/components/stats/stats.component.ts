import { Component, OnInit } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';
// import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  // animations: [
  //   trigger('flyInOut', [
  //   state('in', style({transform: 'translateX(0)'})),
  //   transition('void => *', [
  //     style({ opacity: 0 }),
  //     // animation and styles at end of transition
  //     animate('.3s', style({ opacity: 1 }))
  //   ]),
  //   transition('* => void', [
  //     animate(100, style({transform: 'translateX(100%)'}))
  //   ])
  // ])
  // ],
  // host: { '[@flyInOut]': '' }
})
export class StatsComponent implements OnInit {
  title: string = 'Statistics';
  
  constructor() { }

  ngOnInit() {
  }
  

}
