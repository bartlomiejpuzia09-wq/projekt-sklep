import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShopService } from '../services/shop';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductListComponent {
  readonly shop = inject(ShopService);
  readonly products = this.shop.products;
  addedProductId = '';

  addToCart(productId: string): void {
    this.shop.addToCart(productId);
    this.addedProductId = productId;
    setTimeout(() => {
      if (this.addedProductId === productId) this.addedProductId = '';
    }, 1200);
  }
}
