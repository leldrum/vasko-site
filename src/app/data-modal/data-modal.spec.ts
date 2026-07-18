import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataModal } from './data-modal';

describe('DataModal', () => {
  let component: DataModal;
  let fixture: ComponentFixture<DataModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
