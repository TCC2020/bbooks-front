import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookCardComponent} from './book-card.component';
import {BookService} from '../../../services/book.service';
import {UserbookService} from '../../../services/userbook.service';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../../material/material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {SocialLoginModule} from 'angularx-social-login';
import {bookMock} from '../../../mocks/book.model.mock';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialog} from '@angular/material/dialog';
import {of} from 'rxjs';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {TranslateService} from '@ngx-translate/core'
import {GoogleBooksService} from '../../../services/google-books.service';

describe('BookCardComponent', () => {

    let component: BookCardComponent;
    let fixture: ComponentFixture<BookCardComponent>;
    const mockMatDialog = { open: jest.fn( () =>  {
            return {afterClosed: jest.fn(() => of([])) };
        })};
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MaterialModule,
                HttpClientTestingModule,
                SocialLoginModule,
                BrowserAnimationsModule,
                TranslateServiceMockForChild
            ],
            declarations: [BookCardComponent],
            providers: [
                BookService,
                UserbookService,
                SocialAuthServiceConfigMock,
                {
                    provide: MatDialog, useValue: mockMatDialog
                },
                TranslateService,
                GoogleBooksService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookCardComponent);
        component = fixture.componentInstance;
        component.book = bookMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('verify open Dialog', () => {
        const spy = jest.spyOn(mockMatDialog, 'open');
        component.openDialogAddBook(component.book);
        expect(spy).toHaveBeenCalled();
    });
});
