import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryPswComponent } from './recovery-psw.component';

describe('RecoveryPswComponent', () => {
  let component: RecoveryPswComponent;
  let fixture: ComponentFixture<RecoveryPswComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoveryPswComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryPswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
