import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'product-list',
    loadComponent: () =>
      import('./product-list/product-list').then((component) => component.ProductListComponent),
  },
  {
    path: '',
    loadComponent: () => import('./app').then((component) => component.AppComponent),
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart').then((component) => component.CartComponent),
  },
];
