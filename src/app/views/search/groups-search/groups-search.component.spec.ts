import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupsSearchComponent} from './groups-search.component';
import {MaterialModule} from '../../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {RouterTestingModule} from '@angular/router/testing';

describe('GroupsSearchComponent', () => {
    let component: GroupsSearchComponent;
    let fixture: ComponentFixture<GroupsSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GroupsSearchComponent],
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
