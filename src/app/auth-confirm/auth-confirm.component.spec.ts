import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthConfirmComponent } from './auth-confirm.component';

describe('AuthConfirmComponent', () => {
  let component: AuthConfirmComponent;
  let fixture: ComponentFixture<AuthConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
