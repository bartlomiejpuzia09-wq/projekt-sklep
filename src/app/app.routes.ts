import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./product-list/product-list').then((m) => m.ProductListComponent),
    pathMatch: 'full',
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'product-list',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./product-page/product-page').then((m) => m.ProductPageComponent),
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart').then((m) => m.CartComponent),
  },
  {
    path: 'payment',
    loadComponent: () =>
      import('./checkout/checkout').then((m) => m.CheckoutComponent),
  },
  {
    path: 'order-summary',
    loadComponent: () =>
      import('./order-summary/order-summary').then((m) => m.OrderSummaryComponent),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./not-found/not-found').then((m) => m.NotFoundComponent),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
