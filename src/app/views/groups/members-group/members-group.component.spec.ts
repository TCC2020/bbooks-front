import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersGroupComponent } from './members-group.component';

describe('MembersGroupComponent', () => {
  let component: MembersGroupComponent;
  let fixture: ComponentFixture<MembersGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
