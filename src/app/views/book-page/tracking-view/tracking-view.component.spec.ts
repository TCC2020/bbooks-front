import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TrackingViewComponent} from './tracking-view.component';

describe('TrackingViewComponent', () => {
    let component: TrackingViewComponent;
    let fixture: ComponentFixture<TrackingViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TrackingViewComponent]
        })
            .compileComponents();
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
