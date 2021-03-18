import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookMonthComponent} from './book-month.component';
import {TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../../services/auth.service';
import {userMock} from '../../../mocks/user.model.mock';
import {MatDialog} from '@angular/material/dialog';
import {of} from 'rxjs';
import {MockActivatedRoute} from '../../../mocks/ActivatedRoute.mock';
import {publicProfileMock} from '../../../mocks/public-profile.mock';
import {ActivatedRoute} from '@angular/router';

describe('BookMonthComponent', () => {
    let component: BookMonthComponent;
    let fixture: ComponentFixture<BookMonthComponent>;

    const authServiceMock = {
        getUser: jest.fn(() => userMock)
    };

    const mockMatDialog = {
        open: jest.fn(() => {
            return {
                afterClosed: jest.fn(() => of([]))
            };
        })
    };

    const routeMock = {
        snapshot: {},
        parent: new MockActivatedRoute({
            params: of({id: 'teste'})
        })
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BookMonthComponent],
            imports: [
                HttpClientTestingModule,
                TranslateModule,
                TranslateServiceMockForChild,
                RouterTestingModule
            ],
            providers: [
                TranslateService,
                TranslateStore,
                {
                    provide: AuthService,
                    useValue: authServiceMock
                },
                {
                    provide: MatDialog,
                    useValue: mockMatDialog
                },
                {
                    provide: ActivatedRoute,
                    useValue: routeMock
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookMonthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
