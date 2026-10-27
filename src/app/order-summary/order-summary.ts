import { Component, OnInit, inject } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ShopService } from '../services/shop';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [DecimalPipe, DatePipe, RouterLink],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.scss',
})
export class OrderSummaryComponent implements OnInit {
  readonly shop = inject(ShopService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    if (!this.shop.lastOrder()) {
      void this.router.navigate(['/']);
    }
  }
}
