import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MembersLiteraryCompetitionComponent} from './members-literary-competition.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MembersLiteraryCompetitionComponent', () => {
    let component: MembersLiteraryCompetitionComponent;
    let fixture: ComponentFixture<MembersLiteraryCompetitionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MembersLiteraryCompetitionComponent],
            imports: [
                RouterTestingModule,
                MaterialModule,
                BrowserAnimationsModule,
                InfiniteScrollModule,
                HttpClientTestingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MembersLiteraryCompetitionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
