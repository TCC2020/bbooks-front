import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersGroupComponent } from './members-group.component';
import {MaterialModule} from '../../../material/material.module';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('MembersGroupComponent', () => {
  let component: MembersGroupComponent;
  let fixture: ComponentFixture<MembersGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersGroupComponent ],
      imports: [
        MaterialModule,
        FormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
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
    fixture = TestBed.createComponent(MembersGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
