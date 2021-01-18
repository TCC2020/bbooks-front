import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainExchangeComponent } from './main-exchange.component';

describe('MainExchangeComponent', () => {
  let component: MainExchangeComponent;
  let fixture: ComponentFixture<MainExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
