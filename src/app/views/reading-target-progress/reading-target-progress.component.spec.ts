import { SocialAuthServiceConfigMock } from './../../mocks/google.provide.mock';
import { SocialAuthService } from 'angularx-social-login';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { ReadingTargetService } from 'src/app/services/reading-target.service';

import { ReadingTargetProgressComponent } from './reading-target-progress.component';
import { userMock } from 'src/app/mocks/user.model.mock';
import { TranslateServiceMockForChild } from 'src/app/mocks/translate.service.mock';
import { TranslateService, TranslateStore } from '@ngx-translate/core';

describe('ReadingTargetProgressComponent', () => {
  let component: ReadingTargetProgressComponent;
  let fixture: ComponentFixture<ReadingTargetProgressComponent>;

  const authServiceMock = {
    getUser: jest.fn(() => userMock)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingTargetProgressComponent ],
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserDynamicTestingModule,
        TranslateServiceMockForChild
      ],
      providers: [
        ReadingTargetService,
        BookService,
        GoogleBooksService,
        AuthService,
        SocialAuthService,
        TranslateService,
        TranslateStore,
        SocialAuthServiceConfigMock,
        {
          provide: AuthService,
          useValue: authServiceMock
        }
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingTargetProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
