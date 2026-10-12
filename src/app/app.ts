import { Component, signal } from '@angular/core';
import { ProductListComponent } from './product-list/product-list';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent, RouterOutlet, Header],
  templateUrl: './app.html',
})
export class AppComponent {
  products = [
    { id: 1, name: 'Klawiatura', price: 199 },
    { id: 2, name: 'Mysz', price: 99 },
    { id: 3, name: 'Monitor', price: 899 },
    { id: 4, name: 'Słuchawki', price: 149 },
  ];

  cart = signal<any[]>([]);

  addToCart(product: any) {
    this.cart.set([...this.cart(), product]);
  }

  removeFromCart(index: number) {
    this.cart.update((cart) => cart.filter((_, i) => i !== index));
  }
}
