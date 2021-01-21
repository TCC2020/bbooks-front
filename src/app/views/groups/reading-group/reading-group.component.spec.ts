import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material/material.module';
import { TranslateServiceMockForChild } from 'src/app/mocks/translate.service.mock';

import { ReadingGroupComponent } from './reading-group.component';

describe('ReadingGroupComponent', () => {
  let component: ReadingGroupComponent;
  let fixture: ComponentFixture<ReadingGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingGroupComponent ],
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        TranslateServiceMockForChild,
        BrowserAnimationsModule
      ],
      providers: [
        TranslateService,
        TranslateStore
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
