import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookCardComponent} from './book-card.component';
import {BooksResolve} from "../guards/books.resolve";
import {BookService} from "../../../services/book.service";
import {UserbookService} from "../../../services/userbook.service";
import {RouterTestingModule} from "@angular/router/testing";
import {MaterialModule} from "../../../material/material.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SocialAuthServiceConfigMock} from "../../../mocks/google.provide.mock";
import {SocialLoginModule} from "angularx-social-login";
import {bookMock} from "../../../mocks/book.model.mock";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialog} from "@angular/material/dialog";
import {of} from "rxjs";

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
                BrowserAnimationsModule
            ],
            declarations: [BookCardComponent],
            providers: [
                BookService,
                UserbookService,
                SocialAuthServiceConfigMock,
                {
                    provide: MatDialog, useValue: mockMatDialog
                },
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
        component.openDialogAddBook(component.book, null);
        expect(spy).toHaveBeenCalled();
    });
});
