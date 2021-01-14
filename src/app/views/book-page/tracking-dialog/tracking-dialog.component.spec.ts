import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TrackingDialogComponent} from './tracking-dialog.component';
import {of, throwError} from 'rxjs';
import {SocialAuthServiceConfigMock} from '../../../mocks/google.provide.mock';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {MaterialModule} from '../../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {ReadingTrackingService} from '../../../services/reading-tracking.service';
import {readingTrackingMock} from '../../../mocks/tracking.model';
import {errorMock} from '../../../mocks/error.model.mock';

describe('TrackingDialogComponent', () => {
    let component: TrackingDialogComponent;
    let fixture: ComponentFixture<TrackingDialogComponent>;

    let readingTrackingServiceMock: ReadingTrackingService;

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
            declarations: [TrackingDialogComponent],
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                RouterTestingModule,
                HttpClientTestingModule,
                FormsModule,
                ReactiveFormsModule,
                TranslateServiceMockForChild,
            ],
            providers: [
                ReadingTrackingService,
                SocialAuthServiceConfigMock,
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
        readingTrackingServiceMock = TestBed.inject(ReadingTrackingService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrackingDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('save: should save', done => {
        const spy = jest.spyOn(readingTrackingServiceMock, 'save').mockReturnValue(of(readingTrackingMock));
        component.save();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(component.formTracking.value);
        done();
    });

    it('save: catch error', done => {
        const spy = jest.spyOn(readingTrackingServiceMock, 'save').mockReturnValue(throwError(errorMock));
        component.save();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(component.formTracking.value);
        done();
    });

    it('update: should update', done => {
        component.data.tracking = readingTrackingMock;
        const spy = jest.spyOn(readingTrackingServiceMock, 'update').mockReturnValue(of(readingTrackingMock));
        component.save();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(readingTrackingMock);
        done();
    });

    it('update: catch error', done => {
        component.data.tracking = readingTrackingMock;
        const spy = jest.spyOn(readingTrackingServiceMock, 'update').mockReturnValue(throwError(errorMock));
        component.save();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(readingTrackingMock);
        done();
    });

    it('delete: should delete', done => {
        component.data.tracking = readingTrackingMock;
        const spy = jest.spyOn(readingTrackingServiceMock, 'delete').mockReturnValue(of(null));
        component.delete();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(component.data.tracking.id);
        done();
    });

    it('delete: catch error', done => {
        component.data.tracking = readingTrackingMock;
        const spy = jest.spyOn(readingTrackingServiceMock, 'delete').mockReturnValue(throwError(errorMock));
        component.delete();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(component.data.tracking.id);
        done();
    });

    it('should verify error RT002', () => {
        const spy = jest.spyOn(component, 'verifyError');
        errorMock.error.message = 'RT002';
        component.verifyError(errorMock, '');
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(errorMock, '');
    });

    it('should verify error RT003', () => {
        const spy = jest.spyOn(component, 'verifyError');
        errorMock.error.message = 'RT003';
        component.verifyError(errorMock, '');
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(errorMock, '');
    });

    it('should verify error RT005', () => {
        const spy = jest.spyOn(component, 'verifyError');
        errorMock.error.message = 'RT005';
        component.verifyError(errorMock, '');
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(errorMock, '');
    });

    it('should verify error TA001', () => {
        const spy = jest.spyOn(component, 'verifyError');
        errorMock.error.message = 'TA001';
        component.verifyError(errorMock, '');
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(errorMock, '');
    });

    it('should verify error RT006', () => {
        const spy = jest.spyOn(component, 'verifyError');
        errorMock.error.message = 'RT006';
        component.verifyError(errorMock, '');
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(errorMock, '');
    });
});
