import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionsComponent } from './reactions.component';
import {MaterialModule} from "../../material/material.module";

describe('ReactionsComponent', () => {
  let component: ReactionsComponent;
  let fixture: ComponentFixture<ReactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionsComponent ],
      imports: [
          MaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
