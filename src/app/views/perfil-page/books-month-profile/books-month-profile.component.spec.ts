import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksMonthProfileComponent } from './books-month-profile.component';

describe('BooksMonthProfileComponent', () => {
  let component: BooksMonthProfileComponent;
  let fixture: ComponentFixture<BooksMonthProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksMonthProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksMonthProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
