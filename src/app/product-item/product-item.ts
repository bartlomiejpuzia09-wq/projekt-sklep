import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-item',
  standalone: true,
  template: `
    <p>
      {{ product.name }} - {{ product.price }} zł
      <button (click)="onAddToCart()">Dodaj do koszyka</button>
    </p>
  `
})
export class ProductItemComponent {
  @Input() product: any;
  @Output() addToCart = new EventEmitter<any>();

  onAddToCart(){
    this.addToCart.emit(this.product);
  }
}
