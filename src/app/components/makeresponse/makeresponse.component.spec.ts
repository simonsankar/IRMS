import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeresponseComponent } from './makeresponse.component';

describe('MakeresponseComponent', () => {
  let component: MakeresponseComponent;
  let fixture: ComponentFixture<MakeresponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeresponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
