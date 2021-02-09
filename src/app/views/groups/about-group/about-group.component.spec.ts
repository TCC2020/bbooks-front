import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AboutGroupComponent} from './about-group.component';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {MaterialModule} from '../../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {GroupService} from '../../../services/group.service';
import {ActivatedRoute} from '@angular/router';
import {MockActivatedRoute} from '../../../mocks/ActivatedRoute.mock';
import {of} from 'rxjs';
import {groupMock} from '../../../mocks/group.mock';

describe('AboutGroupComponent', () => {
    let component: AboutGroupComponent;
    let fixture: ComponentFixture<AboutGroupComponent>;
    const routeMock = {
        snapshot: {},
        parent: new MockActivatedRoute({
            params: {id: 'teste'}
        }),
        data: of({groupTo: groupMock})
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AboutGroupComponent],
            imports: [
                MaterialModule,
                FormsModule,
                HttpClientTestingModule,
                TranslateServiceMockForChild,
                ReactiveFormsModule,
                FormsModule
            ],
            providers: [
                TranslateService,
                TranslateStore,
                GroupService,
                {
                    provide: ActivatedRoute,
                    useValue: routeMock
                },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AboutGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
