import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawlinkComponent } from './rawlink.component';

describe('RawlinkComponent', () => {
  let component: RawlinkComponent;
  let fixture: ComponentFixture<RawlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
