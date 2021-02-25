import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLiteraryCompetitionComponent } from './list-literary-competition.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../../material/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ListLiteraryCompetitionComponent', () => {
  let component: ListLiteraryCompetitionComponent;
  let fixture: ComponentFixture<ListLiteraryCompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLiteraryCompetitionComponent ],
      imports: [
          MaterialModule,
          RouterTestingModule,
          BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLiteraryCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
