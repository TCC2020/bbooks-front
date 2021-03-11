import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StoryLiteraryCompetitionComponent} from './story-literary-competition.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {of} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {reviewMock} from '../../../mocks/review.model.mock';
import {bookMock} from '../../../mocks/book.model.mock';

describe('StoryLiteraryCompetitionComponent', () => {
    let component: StoryLiteraryCompetitionComponent;
    let fixture: ComponentFixture<StoryLiteraryCompetitionComponent>;

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
    const data = {

    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StoryLiteraryCompetitionComponent],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                TranslateModule,
                TranslateServiceMockForChild
            ],
            providers: [
                TranslateStore,
                TranslateService,
                {
                    provide: MatDialog,
                    useValue: mockMatDialog
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: data
                },
                {
                    provide: MatDialogRef,
                    useValue: matDialogRefMock
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StoryLiteraryCompetitionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
