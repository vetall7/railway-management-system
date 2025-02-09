import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOrderComponent } from './single-order.component';

describe('SingleOrderComponent', () => {
  let component: SingleOrderComponent;
  let fixture: ComponentFixture<SingleOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleOrderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
