import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorsLiteraryCompetitionComponent } from './administrators-literary-competition.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AdministratorsLiteraryCompetitionComponent', () => {
  let component: AdministratorsLiteraryCompetitionComponent;
  let fixture: ComponentFixture<AdministratorsLiteraryCompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorsLiteraryCompetitionComponent ],
      imports: [
        RouterTestingModule,
        MaterialModule,
        BrowserAnimationsModule
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
