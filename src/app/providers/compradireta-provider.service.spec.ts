import { TestBed } from '@angular/core/testing';

import { CompradiretaProviderService } from './compradireta-provider.service';

describe('CompradiretaProviderService', () => {
  let service: CompradiretaProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompradiretaProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
