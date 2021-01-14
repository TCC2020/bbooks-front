import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TrackingViewComponent} from './tracking-view.component';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {of, throwError} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {readingTrackingMock} from '../../../mocks/tracking.model';
import {TrackingService} from '../../../services/tracking.service';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {trackingMock} from '../../../mocks/tracking.model.mock';
import {errorMock} from '../../../mocks/error.model.mock';

describe('TrackingViewComponent', () => {
    let component: TrackingViewComponent;
    let fixture: ComponentFixture<TrackingViewComponent>;
    let trackingServiceMock: TrackingService;


    const mockMatDialog = {
        open: jest.fn(() => {
            return {afterClosed: jest.fn(() => of([]))};
        })
    };
    const matDialogRefMock = {
        close: jest.fn((response) => {
            return response;
        })
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrackingViewComponent],
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                RouterTestingModule,
                ReactiveFormsModule,
                TranslateServiceMockForChild,
                HttpClientTestingModule,
                FormsModule
            ],
            providers: [
                TrackingService,
                {
                    provide: MatDialog,
                    useValue: mockMatDialog
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: readingTrackingMock
                },
                {
                    provide: MatDialogRef,
                    useValue: matDialogRefMock
                },
                TranslateService,
                TranslateStore
            ]
        }).compileComponents();

        trackingServiceMock = TestBed.inject(TrackingService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrackingViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('save: should save tracking', done => {
        const spy = jest.spyOn(trackingServiceMock, 'save').mockReturnValue(of(readingTrackingMock));
        component.save();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(component.formTracking.value);
        done();
    });
    it('save: should catch erro tracking with TA001', done => {
        errorMock.error.message = 'TA001';
        const spy = jest.spyOn(trackingServiceMock, 'save').mockReturnValue(throwError(errorMock));
        component.save();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(component.formTracking.value);
        done();
    });

    it('save: should catch unknown error', done => {
        errorMock.error.message = '';
        const spy = jest.spyOn(trackingServiceMock, 'save').mockReturnValue(throwError(errorMock));
        component.save();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(component.formTracking.value);
        done();
    });

    it('update: should update tracking', done => {
        component.data.tracking = trackingMock;
        component.data.tracking.id = trackingMock.id;
        const spy = jest.spyOn(trackingServiceMock, 'update').mockReturnValue(of(readingTrackingMock));
        component.save();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(trackingMock);
        done();
    });
    it('update: should catch error tracking with RT002', done => {
        component.data.tracking = trackingMock;
        component.data.tracking.id = trackingMock.id;
        errorMock.error.message = 'RT002';
        const spy = jest.spyOn(trackingServiceMock, 'update').mockReturnValue(throwError(errorMock));
        component.save();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(trackingMock);
        done();
    });

    it('update: should catch error tracking with RT003', done => {
        component.data.tracking = trackingMock;
        component.data.tracking.id = trackingMock.id;
        errorMock.error.message = 'RT003';
        const spy = jest.spyOn(trackingServiceMock, 'update').mockReturnValue(throwError(errorMock));
        component.save();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(trackingMock);
        done();
    });

    it('should catch unknown error', done => {
        component.data.tracking = trackingMock;
        component.data.tracking.id = trackingMock.id;
        errorMock.error.message = '';
        const spy = jest.spyOn(trackingServiceMock, 'update').mockReturnValue(throwError(errorMock));
        component.save();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(trackingMock);
        done();
    });
});
