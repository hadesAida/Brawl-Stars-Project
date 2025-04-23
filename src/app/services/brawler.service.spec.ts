import { TestBed } from '@angular/core/testing';

import { BrawlerService } from './brawler.service';

describe('BrawlerService', () => {
  let service: BrawlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrawlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
