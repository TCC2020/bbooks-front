import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryLiteraryCompetitionComponent } from './story-literary-competition.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('StoryLiteraryCompetitionComponent', () => {
  let component: StoryLiteraryCompetitionComponent;
  let fixture: ComponentFixture<StoryLiteraryCompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryLiteraryCompetitionComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryLiteraryCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
