import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CompetitionSearchComponent} from './competition-search.component';
import {MaterialModule} from '../../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {RouterTestingModule} from '@angular/router/testing';
import {CompetitionService} from '../../../services/competition.service';

describe('CompetitionSearchComponent', () => {
    let component: CompetitionSearchComponent;
    let fixture: ComponentFixture<CompetitionSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CompetitionSearchComponent],
            imports: [
                MaterialModule,
                FormsModule,
                HttpClientTestingModule,
                TranslateServiceMockForChild,
                ReactiveFormsModule,
                FormsModule,
                InfiniteScrollModule,
                RouterTestingModule
            ],
            providers: [
                CompetitionService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CompetitionSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
