import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedPublicProfileComponent } from './feed-public-profile.component';

describe('FeedPublicProfileComponent', () => {
  let component: FeedPublicProfileComponent;
  let fixture: ComponentFixture<FeedPublicProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedPublicProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedPublicProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
