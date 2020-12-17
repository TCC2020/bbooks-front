import { TestBed } from '@angular/core/testing';

import { BookRecommendationService } from './book-recommendation.service';

describe('BookRecommendationService', () => {
  let service: BookRecommendationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRecommendationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
