import { TestBed } from '@angular/core/testing';

import { WondrflyApiService } from './wondrfly-api.service';

describe('WondrflyApiService', () => {
  let service: WondrflyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WondrflyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
