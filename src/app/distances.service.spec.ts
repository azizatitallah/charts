import { TestBed, inject } from '@angular/core/testing';

import { DistancesService } from './distances.service';

describe('DistancesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistancesService]
    });
  });

  it('should be created', inject([DistancesService], (service: DistancesService) => {
    expect(service).toBeTruthy();
  }));
});
