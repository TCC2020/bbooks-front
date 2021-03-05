import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdministratorComponent } from './add-administrator.component';

describe('AddAdministratorComponent', () => {
  let component: AddAdministratorComponent;
  let fixture: ComponentFixture<AddAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
