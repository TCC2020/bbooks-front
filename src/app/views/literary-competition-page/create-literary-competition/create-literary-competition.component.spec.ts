import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateLiteraryCompetitionComponent} from './create-literary-competition.component';
import {MaterialModule} from '../../../material/material.module';
import {RouterLink} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthService} from '../../../services/auth.service';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {userMock} from '../../../mocks/user.model.mock';
import {of} from 'rxjs';

describe('CreateLiteraryCompetitionComponent', () => {
    let component: CreateLiteraryCompetitionComponent;
    let fixture: ComponentFixture<CreateLiteraryCompetitionComponent>;
    let service: AuthService;

    const authServiceMock = {
        getUser: jest.fn(() => userMock),
        language: of('pt')
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateLiteraryCompetitionComponent],
            imports: [
                MaterialModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
                TranslateServiceMockForChild
            ],
            providers: [
                TranslateStore,
                TranslateService,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                SocialAuthServiceConfigMock
            ]
        }).compileComponents();
        service = TestBed.inject(AuthService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateLiteraryCompetitionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
