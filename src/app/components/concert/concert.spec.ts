import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Concert } from './concert';

describe('Concert', () => {
  let component: Concert;
  let fixture: ComponentFixture<Concert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Concert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Concert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
