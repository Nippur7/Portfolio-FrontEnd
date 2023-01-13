import { TestBed } from '@angular/core/testing';

import { ServicefirebaseService } from './servicefirebase.service';

describe('ServicefirebaseService', () => {
  let service: ServicefirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicefirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
