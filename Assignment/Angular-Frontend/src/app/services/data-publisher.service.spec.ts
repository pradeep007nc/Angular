import { TestBed } from '@angular/core/testing';

import { DataPublisherService } from './data-publisher.service';

describe('DataPublisherService', () => {
  let service: DataPublisherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPublisherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
