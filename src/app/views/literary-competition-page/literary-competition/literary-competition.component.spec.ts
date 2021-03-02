import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LiteraryCompetitionComponent} from './literary-competition.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../../material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {AuthService} from '../../../services/auth.service';
import {userMock} from '../../../mocks/user.model.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LiteraryCompetitionComponent', () => {
    let component: LiteraryCompetitionComponent;
    let fixture: ComponentFixture<LiteraryCompetitionComponent>;
    let service: AuthService;

    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LiteraryCompetitionComponent],
            imports: [
                RouterTestingModule,
                MaterialModule,
                HttpClientTestingModule
            ],
            providers: [
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
        fixture = TestBed.createComponent(LiteraryCompetitionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
