import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageNotFoundComponent} from './page-not-found.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../material/material.module';
import {TranslateServiceMockForRoot} from '../../mocks/translate.service.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {bookMock} from '../../mocks/book.model.mock';

describe('PageNotFoundComponent', () => {
    let component: PageNotFoundComponent;
    let fixture: ComponentFixture<PageNotFoundComponent>;

    const routeMock = {
        data: of({book: bookMock})
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageNotFoundComponent],
            imports: [
                RouterTestingModule,
                MaterialModule,
                TranslateServiceMockForRoot,
                HttpClientTestingModule,
                BrowserAnimationsModule
            ],
            providers: [

            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageNotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
