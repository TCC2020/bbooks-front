import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingTargetComponent } from './reading-target.component';

describe('ReadingTargetComponent', () => {
  let component: ReadingTargetComponent;
  let fixture: ComponentFixture<ReadingTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
