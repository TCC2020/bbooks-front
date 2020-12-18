import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SocialLoginModule } from 'angularx-social-login';
import { SocialAuthServiceConfigMock } from '../mocks/google.provide.mock';
import { AuthService } from './auth.service';

import { BookRecommendationService } from './book-recommendation.service';
import { GoogleBooksService } from './google-books.service';
import { UserbookService } from './userbook.service';

describe('BookRecommendationService', () => {
  let service: BookRecommendationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SocialLoginModule
    ],
    providers: [
        AuthService,
        UserbookService,
        GoogleBooksService,
        SocialAuthServiceConfigMock
    ]
    });
    service = TestBed.inject(BookRecommendationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
