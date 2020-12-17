import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferBookDialogComponent } from './refer-book-dialog.component';

describe('ReferBookDialogComponent', () => {
  let component: ReferBookDialogComponent;
  let fixture: ComponentFixture<ReferBookDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferBookDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
