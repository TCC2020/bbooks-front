import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CarrouselComponent} from './carrousel.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GoogleBooksService} from '../../../services/google-books.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../../material/material.module';
import {BookStatus} from '../../../models/enums/BookStatus.enum';
import {bookMock, booksMock} from '../../../mocks/book.model.mock';
import {FlexLayoutModule, FlexModule, MediaChange, MediaObserver} from '@angular/flex-layout';
import {BehaviorSubject} from 'rxjs';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {TranslateService, TranslateStore} from '@ngx-translate/core';

describe('CarrouselComponent', () => {
    let component: CarrouselComponent;
    let fixture: ComponentFixture<CarrouselComponent>;
    let mockMediaSubject: any;

    beforeEach(async(() => {
        mockMediaSubject = new BehaviorSubject({});
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [CarrouselComponent],
            imports: [
                BrowserAnimationsModule,
                RouterTestingModule,
                HttpClientTestingModule,
                MaterialModule,
                FlexLayoutModule,
                FlexModule,
                CarouselModule,
                TranslateServiceMockForChild
            ],
            providers: [
                GoogleBooksService,
                {
                    provide: MediaObserver,
                    useValue: {asObservable: mockMediaSubject.asObservable()}
                },
                TranslateService,
                TranslateStore
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CarrouselComponent);
        component = fixture.componentInstance;
        component.books = booksMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set deviceXS to true when media$ emits xs as mqAlias', () => {
        const mediaChange = new MediaChange();
        mediaChange.mqAlias = 'xs';
        mockMediaSubject.next(mediaChange);
        expect(component.deviceXs).toBeTruthy();
    });

    it('should set deviceXS to false when media$ emits !==xs as mqAlias', () => {
        const mediaChange = new MediaChange();
        mediaChange.mqAlias = 'sm';
        mockMediaSubject.next(mediaChange);
        expect(component.deviceXs).toBeFalsy();
    });

    it('bookReturn',  async () => {
        const event = {
            book: bookMock,
            status: BookStatus.EMPRESTADO
        };
        component.bookReturn(event);
        expect(component.books[component.books.indexOf((event.book))].status).toEqual(event.status);
    });
});
