import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TrackingViewComponent} from './tracking-view.component';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {trackingMock} from '../../../mocks/tracking.model';
import {TrackingService} from '../../../services/tracking.service';

describe('TrackingViewComponent', () => {
    let component: TrackingViewComponent;
    let fixture: ComponentFixture<TrackingViewComponent>;


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
                    useValue: trackingMock
                },
                {
                    provide: MatDialogRef,
                    useValue: matDialogRefMock
                },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrackingViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
