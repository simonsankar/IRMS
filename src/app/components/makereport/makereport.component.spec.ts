import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakereportComponent } from './makereport.component';

describe('MakereportComponent', () => {
  let component: MakereportComponent;
  let fixture: ComponentFixture<MakereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
