import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PaymentMethod, ShopService } from '../services/shop';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, DecimalPipe, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class CheckoutComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly shop = inject(ShopService);
  submitError = '';
  sending = false;

  readonly paymentForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    street: ['', [Validators.required, Validators.minLength(4)]],
    postalCode: ['', [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)]],
    city: ['', [Validators.required, Validators.minLength(2)]],
    paymentMethod: ['blik' as PaymentMethod, Validators.required],
    blikCode: [''],
    cardNumber: [''],
  });

  constructor() {
    this.paymentForm.controls.paymentMethod.valueChanges.subscribe((method) => {
      this.updatePaymentValidators(method ?? 'blik');
    });
    this.updatePaymentValidators('blik');
  }

  private updatePaymentValidators(method: PaymentMethod): void {
    const blik = this.paymentForm.controls.blikCode;
    const card = this.paymentForm.controls.cardNumber;

    if (method === 'blik') {
      blik.setValidators([Validators.required, Validators.pattern(/^\d{6}$/)]);
    } else {
      blik.clearValidators();
    }

    if (method === 'card') {
      card.setValidators([Validators.required, Validators.pattern(/^(?:\d[ -]?){15}\d$/)]);
    } else {
      card.clearValidators();
    }

    blik.updateValueAndValidity({ emitEvent: false });
    card.updateValueAndValidity({ emitEvent: false });
  }

  fieldInvalid(name: 'firstName' | 'lastName' | 'email' | 'street' | 'postalCode' | 'city' | 'blikCode' | 'cardNumber'): boolean {
    const control = this.paymentForm.controls[name];
    return control.invalid && (control.dirty || control.touched);
  }

  submitOrder(): void {
    this.submitError = '';
    if (this.shop.cart().length === 0) {
      this.submitError = 'Koszyk jest pusty. Dodaj produkt przed złożeniem zamówienia.';
      return;
    }

    this.paymentForm.markAllAsTouched();
    if (this.paymentForm.invalid) return;

    this.sending = true;
    // Symulacja odpowiedzi serwera: około 1 na 10 prób kończy się błędem.
    if (Math.random() < 0.1) {
      this.submitError = 'Nie udało się przetworzyć zamówienia. Twoje produkty nadal są w koszyku — spróbuj ponownie.';
      this.sending = false;
      return;
    }

    const value = this.paymentForm.getRawValue();
    this.shop.completeOrder({
      firstName: value.firstName ?? '',
      lastName: value.lastName ?? '',
      street: value.street ?? '',
      postalCode: value.postalCode ?? '',
      city: value.city ?? '',
      email: value.email ?? '',
      paymentMethod: value.paymentMethod ?? 'blik',
    });
    this.sending = false;
    void this.router.navigate(['/order-summary']);
  }
}
