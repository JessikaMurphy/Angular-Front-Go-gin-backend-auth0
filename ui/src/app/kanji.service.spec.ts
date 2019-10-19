import { TestBed } from '@angular/core/testing';

import { KanjiService } from './kanji.service';

describe('KanjiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KanjiService = TestBed.get(KanjiService);
    expect(service).toBeTruthy();
  });
});
