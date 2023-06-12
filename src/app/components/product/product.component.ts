import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../shared/models/model';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input() set product(res: Product) {
    this.productInfo = res;
  }

  private ngUnsubscribe$$ = new Subject();

  productInfo: Product = {} as Product;
  selectedValue: number = 1;

  options = [
    { name: '1', value: 1 },
    { name: '2', value: 2 },
    { name: '3', value: 3 },
    { name: '4', value: 4 },
    { name: '5', value: 5 },
    { name: '6', value: 6 },
    { name: '7', value: 7 },
    { name: '8', value: 8 },
    { name: '9', value: 9 },
    { name: '10', value: 10 },
  ];

  constructor(private cartServie: CartService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.ngUnsubscribe$$.next('');
    this.ngUnsubscribe$$.complete();
  }

  addToCart(): void {
    this.cartServie
      .downloadCart()
      .pipe(
        switchMap((res) => {
          let modifiedProduct;
          let uniqueArray = res.products;

          res.products.map((product) => {
            if (product.id === this.productInfo.id) {
              const amount = product.amount! + this.selectedValue;

              const productIndexToDelete = uniqueArray.findIndex((object) => {
                return object.id === this.productInfo.id;
              });
              uniqueArray.splice(productIndexToDelete, 1);
              modifiedProduct = { ...product, amount };
            }
          });

          if (modifiedProduct) {
            return this.cartServie.modifyCart([
              ...uniqueArray,
              modifiedProduct,
            ]);
          }

          return this.cartServie.modifyCart([
            ...res.products,
            {
              amount: this.selectedValue,
              ...this.productInfo,
            },
          ]);
        }),
        tap(() => {
          this.selectedValue = 1;
        }),
        takeUntil(this.ngUnsubscribe$$)
      )
      .subscribe();
  }

  onSelected(amount: string): void {
    this.selectedValue = Number(amount);
  }
}
