import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutGroupComponent } from './about-group.component';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {MaterialModule} from '../../../material/material.module';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AboutGroupComponent', () => {
  let component: AboutGroupComponent;
  let fixture: ComponentFixture<AboutGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutGroupComponent ],
      imports: [
        MaterialModule,
        FormsModule,
        HttpClientTestingModule,
        TranslateServiceMockForChild
      ],
      providers: [
        TranslateService,
        TranslateStore
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
