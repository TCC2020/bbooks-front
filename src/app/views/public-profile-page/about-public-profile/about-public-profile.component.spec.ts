import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPublicProfileComponent } from './about-public-profile.component';

describe('AboutPublicProfileComponent', () => {
  let component: AboutPublicProfileComponent;
  let fixture: ComponentFixture<AboutPublicProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutPublicProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPublicProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
