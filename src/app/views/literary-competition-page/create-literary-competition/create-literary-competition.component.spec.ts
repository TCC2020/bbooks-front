import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLiteraryCompetitionComponent } from './create-literary-competition.component';
import {MaterialModule} from '../../../material/material.module';
import {RouterLink} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('CreateLiteraryCompetitionComponent', () => {
  let component: CreateLiteraryCompetitionComponent;
  let fixture: ComponentFixture<CreateLiteraryCompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLiteraryCompetitionComponent ],
      imports: [
          MaterialModule,
          RouterTestingModule,
          BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLiteraryCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
