import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StoryLiteraryCompetitionComponent} from './story-literary-competition.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';

describe('StoryLiteraryCompetitionComponent', () => {
    let component: StoryLiteraryCompetitionComponent;
    let fixture: ComponentFixture<StoryLiteraryCompetitionComponent>;

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
                TranslateService
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
