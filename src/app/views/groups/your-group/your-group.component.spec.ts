import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourGroupComponent } from './your-group.component';

describe('YourGroupComponent', () => {
  let component: YourGroupComponent;
  let fixture: ComponentFixture<YourGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
