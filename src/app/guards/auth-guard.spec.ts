import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard';

describe('GuardsComponent', () => {
  let component: AuthGuard;
  let fixture: ComponentFixture<AuthGuard>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthGuard ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthGuard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
