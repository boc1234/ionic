import { TestBed } from '@angular/core/testing';

import { NewOperationService } from './new-operation.service';

describe('NewOperationService', () => {
  let service: NewOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
