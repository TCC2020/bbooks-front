import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedGroupComponent } from './feed-group.component';
import {MaterialModule} from '../../../material/material.module';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {TranslateService, TranslateStore} from '@ngx-translate/core';

describe('FeedGroupComponent', () => {
  let component: FeedGroupComponent;
  let fixture: ComponentFixture<FeedGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedGroupComponent ],
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
    fixture = TestBed.createComponent(FeedGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
