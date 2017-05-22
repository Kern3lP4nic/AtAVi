import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSlackComponent } from './manage-slack.component';

describe('ManageSlackComponent', () => {
  let component: ManageSlackComponent;
  let fixture: ComponentFixture<ManageSlackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSlackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSlackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
