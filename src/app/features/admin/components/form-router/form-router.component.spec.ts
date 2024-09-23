import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRouterComponent } from './form-router.component';

describe('FormRouterComponent', () => {
  let component: FormRouterComponent;
  let fixture: ComponentFixture<FormRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRouterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
