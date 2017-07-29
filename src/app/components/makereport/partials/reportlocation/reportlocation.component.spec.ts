import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportlocationComponent } from './reportlocation.component';

describe('ReportlocationComponent', () => {
  let component: ReportlocationComponent;
  let fixture: ComponentFixture<ReportlocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportlocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
