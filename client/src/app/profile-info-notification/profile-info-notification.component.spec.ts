import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfoNotificationComponent } from './profile-info-notification.component';

describe('ProfileInfoNotificationComponent', () => {
  let component: ProfileInfoNotificationComponent;
  let fixture: ComponentFixture<ProfileInfoNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInfoNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInfoNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
