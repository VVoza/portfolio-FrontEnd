import { TestBed } from '@angular/core/testing';

import { ExperService } from './exper.service';

describe('ExperService', () => {
  let service: ExperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
