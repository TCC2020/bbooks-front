import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material/material.module';
import { SocialAuthServiceConfigMock } from 'src/app/mocks/google.provide.mock';
import { TranslateServiceMockForChild } from 'src/app/mocks/translate.service.mock';
import { userMock } from 'src/app/mocks/user.model.mock';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { ReadingTargetService } from 'src/app/services/reading-target.service';

import { PreviousGoalsComponent } from './previous-goals.component';

describe('PreviousGoalsComponent', () => {
  let component: PreviousGoalsComponent;
  let fixture: ComponentFixture<PreviousGoalsComponent>;

  const authServiceMock = {
    getUser: jest.fn(() => userMock)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousGoalsComponent ],
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
    fixture = TestBed.createComponent(PreviousGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
