import { TestBed } from '@angular/core/testing';

import { AvatarsService } from './avatars.service';

describe('AvatarsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvatarsService = TestBed.get(AvatarsService);
    expect(service).toBeTruthy();
  });
});
