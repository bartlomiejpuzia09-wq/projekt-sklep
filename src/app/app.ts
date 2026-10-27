import { Component, ComponentRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ShopService } from './services/shop';
import type { CartComponent } from './cart/cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  readonly shop = inject(ShopService);
  cartOpen = false;
  private cartOutlet?: ViewContainerRef;
  private cartModalRef?: ComponentRef<CartComponent>;

  @ViewChild('cartModalOutlet', { read: ViewContainerRef })
  set cartModalOutlet(outlet: ViewContainerRef | undefined) {
    this.cartOutlet = outlet;
    if (outlet && this.cartOpen) void this.mountCart(outlet);
  }

  openCart(): void {
    this.cartOpen = true;
  }

  closeCart(): void {
    this.cartOpen = false;
    this.cartModalRef?.destroy();
    this.cartModalRef = undefined;
    this.cartOutlet?.clear();
  }

  private async mountCart(outlet: ViewContainerRef): Promise<void> {
    const { CartComponent } = await import('./cart/cart');
    if (!this.cartOpen || this.cartOutlet !== outlet) return;
    outlet.clear();
    const component = outlet.createComponent(CartComponent);
    this.cartModalRef = component;
    component.setInput('modal', true);
    component.instance.closed.subscribe(() => this.closeCart());
  }
}
