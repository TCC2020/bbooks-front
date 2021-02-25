import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorsLiteraryCompetitionComponent } from './administrators-literary-competition.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('AdministratorsLiteraryCompetitionComponent', () => {
  let component: AdministratorsLiteraryCompetitionComponent;
  let fixture: ComponentFixture<AdministratorsLiteraryCompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorsLiteraryCompetitionComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorsLiteraryCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
