import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PublicProfileComponent} from './public-profile.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../../material/material.module';

describe('PublicProfileComponent', () => {
    let component: PublicProfileComponent;
    let fixture: ComponentFixture<PublicProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PublicProfileComponent],
            imports: [
                RouterTestingModule,
                MaterialModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PublicProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
