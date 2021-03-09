import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupsSearchComponent} from './groups-search.component';
import {MaterialModule} from '../../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {RouterTestingModule} from '@angular/router/testing';
import {EmptyContentMessageComponent} from '../../shared/empty-content-message/empty-content-message.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('GroupsSearchComponent', () => {
    let component: GroupsSearchComponent;
    let fixture: ComponentFixture<GroupsSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [GroupsSearchComponent, EmptyContentMessageComponent],
            imports: [
                MaterialModule,
                FormsModule,
                HttpClientTestingModule,
                TranslateServiceMockForChild,
                ReactiveFormsModule,
                FormsModule,
                InfiniteScrollModule,
                RouterTestingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupsSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
