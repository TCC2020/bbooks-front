import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchBookComponent} from './search-book.component';

describe('SearchBookComponent', () => {
    let component: SearchBookComponent;
    let fixture: ComponentFixture<SearchBookComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchBookComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchBookComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
