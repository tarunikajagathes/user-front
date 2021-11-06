import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UserserviceService } from './userservice.service';

describe('UserserviceService', () => {
  let service: UserserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient,HttpHandler]
    });
    service = TestBed.inject(UserserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
