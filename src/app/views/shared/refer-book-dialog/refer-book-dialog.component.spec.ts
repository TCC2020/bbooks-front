import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {userMock, usersMock, userMock1} from './../../../mocks/user.model.mock';
import {UserService} from 'src/app/services/user.service';
import {of, throwError} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RouterTestingModule} from '@angular/router/testing';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {MaterialModule} from 'src/app/material/material.module';
import {SocialAuthServiceConfigMock} from 'src/app/mocks/google.provide.mock';
import {TranslateServiceMockForRoot} from 'src/app/mocks/translate.service.mock';
import {AuthService} from 'src/app/services/auth.service';
import {BookRecommendationService} from 'src/app/services/book-recommendation.service';
import {BookService} from 'src/app/services/book.service';
import {GoogleBooksService} from 'src/app/services/google-books.service';
import {ProfileService} from 'src/app/services/profile.service';

import {ReferBookDialogComponent} from './refer-book-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {bookMock} from 'src/app/mocks/book.model.mock';
import {By} from '@angular/platform-browser';
import {GroupMemberService} from '../../../services/group-member.service';
import {FriendsService} from '../../../services/friends.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {EmptyContentMessageComponent} from '../empty-content-message/empty-content-message.component';

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
    const matDialogRefMock = {
        close: jest.fn((response) => {
            return response;
        }),
        beforeClosed: jest.fn(() => of([]))
    };

    const mockGetFriends = {
        getFriendsByUserName: jest.fn((id) => of(usersMock))
    };

    const mockAuthService = {
        getUser: jest.fn(() => userMock)
    };

    const mockBookRecommendationService = {
        save: jest.fn(() => of({}))
    };

    const data = {
        book: bookMock
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
                TranslateService,
                TranslateStore,
                BookRecommendationService,
                ProfileService,
                BookService,
                GoogleBooksService,
                GroupMemberService,
                SocialAuthServiceConfigMock,
                {
                    provide: MatDialog,
                    useValue: mockMatDialog
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: data
                },
                {
                    provide: FriendsService,
                    useValue: mockGetFriends
                },
                {
                    provide: AuthService,
                    useValue: mockAuthService
                },
                {
                    provide: BookRecommendationService,
                    useValue: mockBookRecommendationService
                },
                {
                    provide: MatDialogRef,
                    useValue: matDialogRefMock
                },
            ],
            declarations: [ReferBookDialogComponent, EmptyContentMessageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReferBookDialogComponent);
        component = fixture.componentInstance;
        component.Book = bookMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should getUsers', () => {
        component.friendShip.friends = usersMock;
        expect(component.friendShip.friends).toEqual(usersMock);
    });

    it('should pesquisar', () => {
        component.friendShip.friends = usersMock;
        component.pesquisar({value: 'Rafael'});
        expect(component.filterUsers).toEqual([userMock1]);
    });

    it('should referBook', () => {
        component.Book = bookMock;
        component.Book.api = 'google';
        component.bookRecommendationTO.idBookGoogle = 'fafdaf';
        component.formRecommendation.get('comment').setValue('Testando');
        component.referBook(10);
        const spy = jest.spyOn(mockBookRecommendationService, 'save');
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(component.bookRecommendationTO);
    });

    it('shouldCatch errorReferBook', () => {
        component.Book = bookMock;
        component.Book.api = 'google';
        component.bookRecommendationTO.idBookGoogle = 'fafdaf';
        component.formRecommendation.get('comment').setValue('Testando');
        component.referBook(10);
        const spy = jest.spyOn(mockBookRecommendationService, 'save').mockReturnValue(throwError('error'));
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(component.bookRecommendationTO);
    });
});
