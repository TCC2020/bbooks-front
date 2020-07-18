import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAddDialogComponent } from './book-add-dialog.component';

describe('BookAddDialogComponent', () => {
  let component: BookAddDialogComponent;
  let fixture: ComponentFixture<BookAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
