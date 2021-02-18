import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsGroupComponent } from './events-group.component';
import {MaterialModule} from '../../../material/material.module';

describe('EventsGroupComponent', () => {
  let component: EventsGroupComponent;
  let fixture: ComponentFixture<EventsGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsGroupComponent ],
      imports: [
          MaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
