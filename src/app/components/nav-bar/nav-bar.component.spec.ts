import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavBarComponent} from './nav-bar.component';
import {AuthService} from '../../services/auth.service';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateServiceMockForRoot} from '../../mocks/translate.service.mock';
import { BookRecommendationService } from 'src/app/services/book-recommendation.service';
import { ProfileService } from 'src/app/services/profile.service';
import { BookService } from 'src/app/services/book.service';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { userMock } from 'src/app/mocks/user.model.mock';
import { SocialAuthServiceConfigMock } from 'src/app/mocks/google.provide.mock';
import { of } from 'rxjs';

describe('NavBarComponent', () => {
    let component: NavBarComponent;
    let fixture: ComponentFixture<NavBarComponent>;

    const authServiceMock = {
        getUser: jest.fn(() => userMock),
        isLogged: jest.fn(() => true),
        logged: of(true)
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
                TranslateServiceMockForRoot
            ],
            providers: [
                SocialAuthServiceConfigMock,
                AuthService,
                BookRecommendationService,
                ProfileService,
                BookService,
                GoogleBooksService,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                }
            ],
            declarations: [NavBarComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
