import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaSenhaComponent } from './nova-senha.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SocialLoginModule } from 'angularx-social-login';
import { TranslateServiceMockForRoot } from 'src/app/mocks/translate.service.mock';
import { ProfileService } from 'src/app/services/profile.service';
import { SocialAuthServiceConfigMock } from 'src/app/mocks/google.provide.mock';
import { AuthService } from 'src/app/services/auth.service';

describe('NovaSenhaComponent', () => {
  let component: NovaSenhaComponent;
  let fixture: ComponentFixture<NovaSenhaComponent>;

  const userMock = {
      profile: {
          id: 10
      }
  };
  const authServiceMock = {
      getUser: jest.fn(() => userMock)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ NovaSenhaComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        SocialLoginModule,
        TranslateServiceMockForRoot
    ],
    providers: [
        FormBuilder,
        ProfileService,
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
    fixture = TestBed.createComponent(NovaSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
