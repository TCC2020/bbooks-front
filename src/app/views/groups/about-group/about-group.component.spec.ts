import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AboutGroupComponent} from './about-group.component';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {MaterialModule} from '../../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {GroupService} from '../../../services/group.service';
import {ActivatedRoute} from '@angular/router';
import {MockActivatedRoute} from '../../../mocks/ActivatedRoute.mock';
import {of, throwError} from 'rxjs';
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
    let httpMock: HttpTestingController;
    let groupServcieMock: GroupService;
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
        }).compileComponents();

        httpMock = TestBed.inject(HttpTestingController);
        groupServcieMock = TestBed.inject(GroupService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AboutGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('changeToEdit', () => {
        component.changeToEdit();
        expect(component.isEditing).toBeTruthy();
    });

    it('should update group', () => {
        const spy = jest.spyOn(groupServcieMock, 'update').mockReturnValue(of(groupMock));
        component.update();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(component.formGroup.value);
    });

    it('should catch update group error', () => {
        const spy = jest.spyOn(groupServcieMock, 'update').mockReturnValue(throwError('error'));
        component.update();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(component.formGroup.value);
    });

});
