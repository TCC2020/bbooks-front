import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendOfferRequestComponent } from './send-offer-request.component';

describe('SendOfferRequestComponent', () => {
  let component: SendOfferRequestComponent;
  let fixture: ComponentFixture<SendOfferRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendOfferRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendOfferRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
