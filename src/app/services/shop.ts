import { Injectable, computed, signal } from '@angular/core';

export interface Product {
  id: string;
  name: string;

  price: number;
  description: string;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'blik' | 'card' | 'transfer';

export interface OrderSummary {
  number: string;
  customerName: string;
  address: string;
  email: string;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  total: number;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class ShopService {
  readonly products: Product[] = [
    {
      id: 'keyboard',
      name: 'Klawiatura mechaniczna',

      price: 199,
      description:
        'Wygodna klawiatura do nauki, pracy i grania. Wyraźny skok klawiszy i solidna obudowa zapewniają komfort podczas długiego użytkowania.',
      rating: 4.7,
      reviews: 128,
    },
    {
      id: 'mouse',
      name: 'Mysz komputerowa',
      price: 99,
      description:
        'Precyzyjna mysz o ergonomicznym kształcie. Sprawdzi się podczas codziennej pracy przy komputerze.',
      rating: 4.5,
      reviews: 86,
    },
    {
      id: 'monitor',
      name: 'Monitor 27 cali',
      price: 899,
      description:
        'Duży monitor z wyraźnym wyświetlaczem, który ułatwia wielozadaniową pracę i zapewnia wygodną przestrzeń roboczą.',
      rating: 4.8,
      reviews: 54,
    },
    {
      id: 'headphones',
      name: 'Słuchawki bezprzewodowe',
      price: 149,
      description:
        'Wygodne słuchawki do muzyki, spotkań online i nauki. Miękkie nauszniki pomagają komfortowo korzystać z nich przez dłuższy czas.',
      rating: 4.4,
      reviews: 102,
    },
  ];

  readonly cart = signal<CartItem[]>([]);
  readonly cartCount = computed(() => this.cart().reduce((sum, item) => sum + item.quantity, 0));
  readonly lastOrder = signal<OrderSummary | null>(null);

  addToCart(productId: string): void {
    const product = this.products.find((item) => item.id === productId);
    if (!product) return;

    this.cart.update((items) => {
      const existing = items.find((item) => item.product.id === productId);
      if (existing) {
        return items.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  increase(productId: string): void {
    this.cart.update((items) =>
      items.map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  decrease(productId: string): void {
    this.cart.update((items) =>
      items
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  total(): number {
    return this.cart().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  completeOrder(data: {
    firstName: string;
    lastName: string;
    street: string;
    postalCode: string;
    city: string;
    email: string;
    paymentMethod: PaymentMethod;
  }): void {
    const items = this.cart().map((item) => ({ ...item }));
    const total = this.total();

    this.lastOrder.set({
      number: `SK-${Date.now().toString().slice(-8)}`,
      customerName: `${data.firstName} ${data.lastName}`,
      address: `${data.street}, ${data.postalCode} ${data.city}`,
      email: data.email,
      paymentMethod: data.paymentMethod,
      items,
      total,
      createdAt: new Date(),
    });
    this.cart.set([]);
  }
}
