import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarAmigosComponent } from './pesquisar-amigos.component';

describe('PesquisarAmigosComponent', () => {
  let component: PesquisarAmigosComponent;
  let fixture: ComponentFixture<PesquisarAmigosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisarAmigosComponent ]
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
