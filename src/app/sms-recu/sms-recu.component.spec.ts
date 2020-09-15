import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsRecuComponent } from './sms-recu.component';

describe('SmsRecuComponent', () => {
  let component: SmsRecuComponent;
  let fixture: ComponentFixture<SmsRecuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsRecuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsRecuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
