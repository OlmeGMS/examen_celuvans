import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullintentsComponent } from './fullintents.component';

describe('FullintentsComponent', () => {
  let component: FullintentsComponent;
  let fixture: ComponentFixture<FullintentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullintentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullintentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
