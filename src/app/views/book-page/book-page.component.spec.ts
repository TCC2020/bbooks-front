import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookPageComponent} from './book-page.component';
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('BookPageComponent', () => {
    let component: BookPageComponent;
    let fixture: ComponentFixture<BookPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                FlexModule,
                FlexLayoutModule,
            ],
            declarations: [BookPageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
