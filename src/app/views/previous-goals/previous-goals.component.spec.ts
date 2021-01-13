import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousGoalsComponent } from './previous-goals.component';

describe('PreviousGoalsComponent', () => {
  let component: PreviousGoalsComponent;
  let fixture: ComponentFixture<PreviousGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
