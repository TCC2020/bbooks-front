import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEstanteComponent } from './book-estante.component';

describe('BookEstanteComponent', () => {
  let component: BookEstanteComponent;
  let fixture: ComponentFixture<BookEstanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookEstanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEstanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
