import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllReactionsComponent } from './view-all-reactions.component';

describe('ViewAllReactionsComponent', () => {
  let component: ViewAllReactionsComponent;
  let fixture: ComponentFixture<ViewAllReactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllReactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllReactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
