import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePublicProfileComponent } from './create-public-profile.component';

describe('CreatePublicProfileComponent', () => {
  let component: CreatePublicProfileComponent;
  let fixture: ComponentFixture<CreatePublicProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePublicProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePublicProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
