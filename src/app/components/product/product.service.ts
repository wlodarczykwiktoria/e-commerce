import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Products, Product } from '../../shared/models/model';

@Injectable()
export class ProductService {
  constructor(protected httpClient: HttpClient) {}

  modifyCart(products: Product[]): Observable<Products> {
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
          const cartAmount = res.products
            .map((res) => res.amount)
            .reduce((pre, acc) => {
              return Number(pre) + Number(acc);
            });
          localStorage.setItem('cartAmount', String(cartAmount));
        })
      );
  }
}
