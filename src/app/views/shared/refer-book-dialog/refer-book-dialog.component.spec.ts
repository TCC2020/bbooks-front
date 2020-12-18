import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { MaterialModule } from 'src/app/material/material.module';
import { SocialAuthServiceConfigMock } from 'src/app/mocks/google.provide.mock';
import { TranslateServiceMockForRoot } from 'src/app/mocks/translate.service.mock';
import { AuthService } from 'src/app/services/auth.service';
import { BookRecommendationService } from 'src/app/services/book-recommendation.service';
import { BookService } from 'src/app/services/book.service';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { ProfileService } from 'src/app/services/profile.service';

import { ReferBookDialogComponent } from './refer-book-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { bookMock } from 'src/app/mocks/book.model.mock';

describe('ReferBookDialogComponent', () => {
  let component: ReferBookDialogComponent;
  let fixture: ComponentFixture<ReferBookDialogComponent>;

  const mockMatDialog = {
      open: jest.fn(() => {
        return {
            afterClosed: jest.fn(() => of([]))
        };
    })
  };

  const data = {
    book: bookMock
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SocialLoginModule,
        RouterTestingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateServiceMockForRoot,
        BrowserAnimationsModule
    ],
    providers: [
        AuthService,
        BookRecommendationService,
        ProfileService,
        BookService,
        GoogleBooksService,
        SocialAuthServiceConfigMock,
                {
                    provide: MatDialog,
                    useValue: mockMatDialog
                },
                {
                  provide: MAT_DIALOG_DATA,
                  useValue: data
              },
    ],
    declarations: [ ReferBookDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
