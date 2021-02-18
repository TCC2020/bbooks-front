import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMonthComponent } from './book-month.component';

describe('BookMonthComponent', () => {
  let component: BookMonthComponent;
  let fixture: ComponentFixture<BookMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
