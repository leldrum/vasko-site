import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReahearsalForm } from './reahearsal-form';

describe('ReahearsalForm', () => {
  let component: ReahearsalForm;
  let fixture: ComponentFixture<ReahearsalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReahearsalForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReahearsalForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
