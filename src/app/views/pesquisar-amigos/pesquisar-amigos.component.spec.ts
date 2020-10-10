import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SocialLoginModule } from 'angularx-social-login';
import { MaterialModule } from 'src/app/material/material.module';
import { SocialAuthServiceConfigMock } from 'src/app/mocks/google.provide.mock';
import { TranslateServiceMockForRoot } from 'src/app/mocks/translate.service.mock';
import { AuthService } from 'src/app/services/auth.service';
import { ConsultaCepService } from 'src/app/services/consulta-cep.service';
import { ProfileService } from 'src/app/services/profile.service';

import { PesquisarAmigosComponent } from './pesquisar-amigos.component';

describe('PesquisarAmigosComponent', () => {
  let component: PesquisarAmigosComponent;
  let fixture: ComponentFixture<PesquisarAmigosComponent>;
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
      declarations: [ PesquisarAmigosComponent ],
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
        ConsultaCepService,
        ProfileService,
        SocialAuthServiceConfigMock,
        {
          provide: AuthService,
          useValue: SocialAuthServiceConfigMock
      }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisarAmigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
