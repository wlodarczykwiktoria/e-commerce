import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from '../../shared/models/model';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsService],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$$ = new Subject();

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  products: Product[] = [];

  ngOnInit(): void {
    this.donwloadProducts();
    this.downloadCart();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$$.next('');
    this.ngUnsubscribe$$.complete();
  }

  private donwloadProducts(): void {
    this.productsService
      .downloadProducts()
      .pipe(
        tap((res) => {
          console.log(res);

          this.products = [...res.chairs, ...res.tables];
        }),
        takeUntil(this.ngUnsubscribe$$)
      )
      .subscribe();
  }

  private downloadCart(): void {
    this.cartService
      .downloadCart()
      .pipe(
        tap((res) => {
          if (res.products.length === 0) {
            localStorage.setItem('cartAmount', '0');
            this.cartService.updateCartAmount(0);
            return;
          }

          const cartAmount = res.products
            .map((res) => res.amount)
            .reduce((pre, acc) => {
              return Number(pre) + Number(acc);
            });
          console.log(cartAmount);

          localStorage.setItem('cartAmount', String(cartAmount));
          this.cartService.updateCartAmount(cartAmount as number);
        })
      )
      .subscribe();
  }
}
