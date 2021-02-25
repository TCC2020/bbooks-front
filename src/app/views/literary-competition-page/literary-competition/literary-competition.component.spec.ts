import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteraryCompetitionComponent } from './literary-competition.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../../material/material.module';

describe('LiteraryCompetitionComponent', () => {
  let component: LiteraryCompetitionComponent;
  let fixture: ComponentFixture<LiteraryCompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiteraryCompetitionComponent ],
      imports: [
        RouterTestingModule,
          MaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiteraryCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
