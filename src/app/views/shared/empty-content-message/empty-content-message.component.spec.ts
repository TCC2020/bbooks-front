import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EmptyContentMessageComponent} from './empty-content-message.component';
import {MaterialModule} from '../../../material/material.module';

describe('EmptyContentMessageComponent', () => {
    let component: EmptyContentMessageComponent;
    let fixture: ComponentFixture<EmptyContentMessageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EmptyContentMessageComponent],
            imports: [
                MaterialModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EmptyContentMessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
