import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcaseModalComponent } from './bookcase-modal.component';

describe('BookcaseModalComponent', () => {
  let component: BookcaseModalComponent;
  let fixture: ComponentFixture<BookcaseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookcaseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookcaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
