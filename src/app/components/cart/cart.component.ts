import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Observable, Subject, map, switchMap, takeUntil, tap } from 'rxjs';
import { Products, Product } from '../../shared/models/model';
import { RoutingService } from 'src/app/shared/services/routing.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$$ = new Subject();

  constructor(
    private cartService: CartService,
    private router: RoutingService,
    private route: ActivatedRoute
  ) {}

  products: Product[] = [];

  ngOnDestroy(): void {
    this.ngUnsubscribe$$.next('');
    this.ngUnsubscribe$$.complete();
  }

  ngOnInit(): void {
    this.downloadCart().subscribe();
  }

  goToProducts(): void {
    this.router.navigate(['../', 'products'], {
      relativeTo: this.route,
    });
  }

  goToCheckout(): void {
    this.router.navigate(['../', 'checkout'], {
      relativeTo: this.route,
    });
  }

  onDelete(id: number): void {
    this.downloadCart()
      .pipe(
        map((cartProducts) => {
          let uniqueArray = cartProducts.products;

          const productIndexToDelete = cartProducts.products.findIndex(
            (object) => {
              return object.id === id;
            }
          );
          uniqueArray.splice(productIndexToDelete, 1);

          return uniqueArray;
        }),
        switchMap((productsWithoutDeletedProduct) => {
          return this.cartService.modifyCart(productsWithoutDeletedProduct);
        }),
        takeUntil(this.ngUnsubscribe$$)
      )
      .subscribe();
  }

  private downloadCart(): Observable<Products> {
    return this.cartService.downloadCart().pipe(
      tap((responseProducts) => {
        console.log(responseProducts);

        this.products = responseProducts.products;
      }),
      takeUntil(this.ngUnsubscribe$$)
    );
  }
}
