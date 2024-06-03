/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LogicaNegocioService } from './logica-negocio.service';

describe('Service: LogicaNegocio', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogicaNegocioService]
    });
  });

  it('should ...', inject([LogicaNegocioService], (service: LogicaNegocioService) => {
    expect(service).toBeTruthy();
  }));
});
