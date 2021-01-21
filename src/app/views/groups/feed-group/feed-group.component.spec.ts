import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedGroupComponent } from './feed-group.component';

describe('FeedGroupComponent', () => {
  let component: FeedGroupComponent;
  let fixture: ComponentFixture<FeedGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
