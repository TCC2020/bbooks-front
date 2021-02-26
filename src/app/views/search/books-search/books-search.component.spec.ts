import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BooksSearchComponent} from './books-search.component';

describe('BooksSearchComponent', () => {
    let component: BooksSearchComponent;
    let fixture: ComponentFixture<BooksSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BooksSearchComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BooksSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
