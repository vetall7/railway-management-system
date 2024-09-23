import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICarModalDataInfo } from '@features/search-trip/models';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewChangeEvent, TabViewModule } from 'primeng/tabview';

import { AuthFormComponent } from '../auth-form';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  standalone: true,
  imports: [
    AuthFormComponent,
    Button,
    CommonModule,
    ReactiveFormsModule,
    TabViewModule,
    InputTextModule,
  ],
})
export class PaymentComponent {
  isShowingErrors = false;

  paymentForm: FormGroup = new FormGroup({
    paymentMethod: new FormControl('card', Validators.required),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^([0-9]{4}[- ]?){3}[0-9]{4}$'),
    ]),
    expiryDate: new FormControl('', [
      Validators.required,
      Validators.pattern('^(0[1-9]|1[0-2])\\/?([0-9]{4}|[0-9]{2})$'),
    ]),
    cvv: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}$')]),
    paypalEmail: new FormControl(''),
  });

  @Output() public createOrderEmit = new EventEmitter<ICarModalDataInfo>();

  @Input() public modalData!: ICarModalDataInfo;

  public createOrder(): void {
    this.createOrderEmit.emit({
      ...this.modalData,
    });
  }

  protected onTabChange(event: TabViewChangeEvent): void {
    const tabIndex = event.index;
    if (tabIndex === 0) {
      this.setCardValidators();
      this.paymentForm.get('paymentMethod')?.setValue('card');
    } else {
      this.setPaypalValidators();
      this.paymentForm.get('paymentMethod')?.setValue('paypal');
    }
    this.paymentForm.updateValueAndValidity();
  }

  private setCardValidators(): void {
    this.paymentForm
      .get('cardNumber')
      ?.setValidators([Validators.required, Validators.pattern('^([0-9]{4}[- ]?){3}[0-9]{4}$')]);
    this.paymentForm
      .get('expiryDate')
      ?.setValidators([
        Validators.required,
        Validators.pattern('^(0[1-9]|1[0-2])\\/?([0-9]{4}|[0-9]{2})$'),
      ]);
    this.paymentForm
      .get('cvv')
      ?.setValidators([Validators.required, Validators.pattern('^[0-9]{3}$')]);
    this.paymentForm.get('paypalEmail')?.clearValidators();

    this.updateValueAndValidity();
  }

  private setPaypalValidators(): void {
    this.paymentForm.get('cardNumber')?.clearValidators();
    this.paymentForm.get('expiryDate')?.clearValidators();
    this.paymentForm.get('cvv')?.clearValidators();
    this.paymentForm.get('paypalEmail')?.setValidators([Validators.email, Validators.required]);

    this.updateValueAndValidity();
  }

  private updateValueAndValidity(): void {
    this.paymentForm.get('cardNumber')?.updateValueAndValidity();
    this.paymentForm.get('expiryDate')?.updateValueAndValidity();
    this.paymentForm.get('cvv')?.updateValueAndValidity();
    this.paymentForm.get('paypalEmail')?.updateValueAndValidity();
  }

  onPayment() {
    this.isShowingErrors = true;
    // if (this.paymentForm.invalid) {
    // }

    // const { paymentMethod, cardNumber, expiryDate, cvv, paypalEmail } = this.paymentForm.value;

    // if (paymentMethod === 'card') {
    //   // Process card payment
    // } else {
    //   // Process PayPal payment
    // }

    // Success or error handling
  }
}
