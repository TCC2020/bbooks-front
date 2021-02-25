import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersLiteraryCompetitionComponent } from './members-literary-competition.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('MembersLiteraryCompetitionComponent', () => {
  let component: MembersLiteraryCompetitionComponent;
  let fixture: ComponentFixture<MembersLiteraryCompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersLiteraryCompetitionComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersLiteraryCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
