import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaForm } from './media-form';

describe('MediaForm', () => {
  let component: MediaForm;
  let fixture: ComponentFixture<MediaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
