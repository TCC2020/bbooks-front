import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExchangeReceivedComponent} from './exchange-received.component';

describe('ExchangeReceivedComponent', () => {
    let component: ExchangeReceivedComponent;
    let fixture: ComponentFixture<ExchangeReceivedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExchangeReceivedComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExchangeReceivedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
