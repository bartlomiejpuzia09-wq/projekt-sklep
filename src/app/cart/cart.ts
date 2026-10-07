import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  template: `
    <h2>KOSZYK</h2>
    @if (cart.length === 0) {
      <p>Koszyk jest pusty.</p>
    } @else {
      @for (item of cart; track $index) {
        <p>
          {{ item.name }} {{ item.price }} zł
          <button (click)="remove.emit($index)">Usuń</button>
        </p>
      }
      <hr>
      <p>RAZEM: {{ getTotal() }} zł</p>
    }
  `
})
export class CartComponent {
  @Input() cart: any[] = [];
  @Output() remove = new EventEmitter<number>();

  getTotal() {
    console.log(this.cart);
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }

  ngOnInit(){
    console.log(this.cart);
  }
}