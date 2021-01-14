import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBoardComponent } from './mobile-board.component';

describe('MobileBoardComponent', () => {
  let component: MobileBoardComponent;
  let fixture: ComponentFixture<MobileBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
