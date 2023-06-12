import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Products, Product } from '../../shared/models/model';

@Injectable()
export class CartService {
  private cartAmount$$ = new BehaviorSubject<number>(0);

  cartAmount$ = this.cartAmount$$.asObservable();

  updateCartAmount(cartAmount: number): void {
    this.cartAmount$$.next(cartAmount);
  }

  constructor(protected httpClient: HttpClient) {}

  downloadCart(): Observable<Products> {
    return this.httpClient.get<Products>(
      `http://localhost:3000/carts/${localStorage.getItem('userId')}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }

  createUserCart(): Observable<unknown> {
    return this.httpClient.post<unknown>(
      `http://localhost:3000/carts`,
      { products: [], userId: localStorage.getItem('userId') },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }

  modifyCart(products: Product[] | []): Observable<Products> {
    return this.httpClient
      .put<Products>(
        `http://localhost:3000/carts/${localStorage.getItem('userId')}`,
        { products: products, userId: localStorage.getItem('userId') },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .pipe(
        tap((res) => {
          if (res.products.length === 0) {
            localStorage.setItem('cartAmount', '0');
            this.updateCartAmount(0);
            return;
          }

          const cartAmount = res.products
            .map((res) => res.amount)
            .reduce((pre, acc) => {
              return Number(pre) + Number(acc);
            });

          localStorage.setItem('cartAmount', String(cartAmount));
          this.updateCartAmount(cartAmount as number);
        })
      );
  }
}
