import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransciverComponent } from './transciver.component';

describe('TransciverComponent', () => {
  let component: TransciverComponent;
  let fixture: ComponentFixture<TransciverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransciverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransciverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
