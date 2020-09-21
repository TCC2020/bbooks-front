import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaSenhaComponent } from './nova-senha.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('NovaSenhaComponent', () => {
  let component: NovaSenhaComponent;
  let fixture: ComponentFixture<NovaSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ NovaSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
