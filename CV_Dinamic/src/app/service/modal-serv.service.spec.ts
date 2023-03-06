import { TestBed } from '@angular/core/testing';

import { ModalServService } from './modal-serv.service';

describe('ModalServService', () => {
  let service: ModalServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
