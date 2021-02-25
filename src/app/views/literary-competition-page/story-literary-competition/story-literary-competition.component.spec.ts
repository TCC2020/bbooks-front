import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryLiteraryCompetitionComponent } from './story-literary-competition.component';

describe('StoryLiteraryCompetitionComponent', () => {
  let component: StoryLiteraryCompetitionComponent;
  let fixture: ComponentFixture<StoryLiteraryCompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryLiteraryCompetitionComponent ]
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
