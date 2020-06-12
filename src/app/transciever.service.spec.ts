import { TestBed } from '@angular/core/testing';

import { TranscieverService } from './transciever.service';

describe('TranscieverService', () => {
  let service: TranscieverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranscieverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
