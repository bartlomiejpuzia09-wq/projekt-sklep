import { Component } from '@angular/core';
import { ProductListComponent } from './product-list/product-list';
import { CartComponent } from './cart/cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent, CartComponent],
  template: `
    <h1>Sklep</h1>
    <app-product-list [products]="products" (addToCart)="addToCart($event)"></app-product-list>
    <hr>
    <app-cart [cart]="cart" (remove)="removeFromCart($event)"></app-cart>
  `
})
export class AppComponent {
  products = [
    { id: 1, name: 'Klawiatura', price: 199 },
    { id: 2, name: 'Mysz', price: 99 },
    { id: 3, name: 'Monitor', price: 899 },
    { id: 4, name: 'Słuchawki', price: 149 }
  ];
  cart: any[] = [];

  addToCart(product: any) {
    this.cart.push(product);
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1); // Usuwamy element z konkretnej pozycji
  }
}