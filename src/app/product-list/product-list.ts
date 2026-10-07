import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductItemComponent } from '../product-item/product-item';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductItemComponent],
  template: `
    <h2>Produkty</h2>
    @for (p of products; track p.id) {
      <app-product-item [product]="p" (addToCart)="addToCart.emit($event)"></app-product-item>
    }
  `
})
export class ProductListComponent {
  @Input() products: any[] = [];
  @Output() addToCart = new EventEmitter<any>();
}