import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteraryCompetitionComponent } from './literary-competition.component';

describe('LiteraryCompetitionComponent', () => {
  let component: LiteraryCompetitionComponent;
  let fixture: ComponentFixture<LiteraryCompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiteraryCompetitionComponent ]
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
