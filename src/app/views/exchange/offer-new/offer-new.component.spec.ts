import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferNewComponent } from './offer-new.component';

describe('OfferNewComponent', () => {
  let component: OfferNewComponent;
  let fixture: ComponentFixture<OfferNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
