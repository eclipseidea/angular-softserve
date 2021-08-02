import { TestBed } from '@angular/core/testing';

import { ParamInterceptor } from './param-interceptor.interceptor';

describe('ParamInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ParamInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ParamInterceptor = TestBed.inject(ParamInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
