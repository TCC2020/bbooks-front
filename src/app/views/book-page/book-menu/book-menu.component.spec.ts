import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMenuComponent } from './book-menu.component';

describe('BookMenuComponent', () => {
  let component: BookMenuComponent;
  let fixture: ComponentFixture<BookMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
