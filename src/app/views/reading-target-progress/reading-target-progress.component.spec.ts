import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingTargetProgressComponent } from './reading-target-progress.component';

describe('ReadingTargetProgressComponent', () => {
  let component: ReadingTargetProgressComponent;
  let fixture: ComponentFixture<ReadingTargetProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingTargetProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingTargetProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
