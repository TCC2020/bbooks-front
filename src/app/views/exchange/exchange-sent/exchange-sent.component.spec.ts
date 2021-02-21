import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExchangeSentComponent} from './exchange-sent.component';

describe('ExchangeSentComponent', () => {
    let component: ExchangeSentComponent;
    let fixture: ComponentFixture<ExchangeSentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExchangeSentComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExchangeSentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
