import { TestBed } from '@angular/core/testing';

import { PersService } from './pers.service';

describe('PersService', () => {
  let service: PersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
