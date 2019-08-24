import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSendFileComponent } from './user-send-file.component';

describe('UserSendFileComponent', () => {
  let component: UserSendFileComponent;
  let fixture: ComponentFixture<UserSendFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSendFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSendFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
