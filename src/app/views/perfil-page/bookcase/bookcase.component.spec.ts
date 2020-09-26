import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcaseComponent } from './bookcase.component';

describe('BookcaseComponent', () => {
  let component: BookcaseComponent;
  let fixture: ComponentFixture<BookcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
