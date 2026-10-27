import { Component, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product, ShopService } from '../services/shop';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly shop = inject(ShopService);

  product: Product | undefined;
  otherProducts: Product[] = [];
  carouselIndex = 0;
  added = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.product = this.shop.products.find((item) => item.id === id);
    if (!this.product) {
      void this.router.navigate(['/not-found']);
      return;
    }
    this.otherProducts = this.shop.products.filter((item) => item.id !== this.product?.id);
  }

  get visibleProducts(): Product[] {
    if (this.otherProducts.length <= 3) return this.otherProducts;
    return Array.from({ length: 3 }, (_, index) =>
      this.otherProducts[(this.carouselIndex + index) % this.otherProducts.length],
    );
  }

  previous(): void {
    if (this.otherProducts.length) {
      this.carouselIndex = (this.carouselIndex - 1 + this.otherProducts.length) % this.otherProducts.length;
    }
  }

  next(): void {
    if (this.otherProducts.length) {
      this.carouselIndex = (this.carouselIndex + 1) % this.otherProducts.length;
    }
  }

  addToCart(): void {
    if (!this.product) return;
    this.shop.addToCart(this.product.id);
    this.added = true;
    setTimeout(() => (this.added = false), 1200);
  }
}
