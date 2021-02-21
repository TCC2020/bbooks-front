import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBookAdtoComponent } from './search-book-adto.component';

describe('SearchBookAdtoComponent', () => {
  let component: SearchBookAdtoComponent;
  let fixture: ComponentFixture<SearchBookAdtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBookAdtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBookAdtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
