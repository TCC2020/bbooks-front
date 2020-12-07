import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {SocialAuthService} from 'angularx-social-login';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateServiceMockForRoot} from './mocks/translate.service.mock';

describe('AppComponent', () => {

  let fixture;
  let component;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        RouterTestingModule,
        TranslateServiceMockForRoot
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
          SocialAuthService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  it('should be initialized', () => {
    expect(fixture).toBeTruthy();
  });

  it(`should have as title 'bbooks'`, () => {
    expect(component.title).toEqual('bbooks');
  });

});
