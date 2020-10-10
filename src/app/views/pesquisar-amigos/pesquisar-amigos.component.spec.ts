import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SocialLoginModule } from 'angularx-social-login';
import { MaterialModule } from 'src/app/material/material.module';
import { TranslateServiceMockForRoot } from 'src/app/mocks/translate.service.mock';

import { PesquisarAmigosComponent } from './pesquisar-amigos.component';

describe('PesquisarAmigosComponent', () => {
  let component: PesquisarAmigosComponent;
  let fixture: ComponentFixture<PesquisarAmigosComponent>;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisarAmigosComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        RouterTestingModule,
        SocialLoginModule,
        TranslateServiceMockForRoot
    ],
    providers: [
      FormBuilder,
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisarAmigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
