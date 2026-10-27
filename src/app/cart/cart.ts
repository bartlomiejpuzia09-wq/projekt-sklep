import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShopService } from '../services/shop';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartComponent {
  @Input() modal = false;
  @Output() closed = new EventEmitter<void>();

  readonly shop = inject(ShopService);

  get items() {
    return this.shop.cart();
  }

  get total(): number {
    return this.shop.total();
  }

  increase(productId: string): void {
    this.shop.increase(productId);
  }

  decrease(productId: string): void {
    this.shop.decrease(productId);
  }

  close(): void {
    this.closed.emit();
  }
}
