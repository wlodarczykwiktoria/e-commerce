import { Component, OnInit } from '@angular/core';
import { Subject, Observable, tap, takeUntil, switchMap } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { Products, Product, Address } from '../../shared/models/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from 'src/app/shared/services/routing.service';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [FormBuilder],
})
export class CheckoutComponent implements OnInit {
  private ngUnsubscribe$$ = new Subject();

  checkoutForm: FormGroup;
  products: Product[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private formb: FormBuilder,
    private router: RoutingService,
    private route: ActivatedRoute
  ) {
    this.checkoutForm = this.formb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      address: ['', Validators.required],
      apartment: [''],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$$.next('');
    this.ngUnsubscribe$$.complete();
  }

  ngOnInit(): void {
    this.downloadCart().subscribe();
  }

  sendOrder(event: Event): void {
    event.preventDefault();
    const orderData: Address = {
      name: this.checkoutForm.controls['name'].value,
      surname: this.checkoutForm.controls['surname'].value,
      address: this.checkoutForm.controls['address'].value,
      apartment: this.checkoutForm.controls['apartment'].value,
      zipcode: this.checkoutForm.controls['zipcode'].value,
      city: this.checkoutForm.controls['city'].value,
      phoneNumber: this.checkoutForm.controls['phoneNumber'].value,
    };
    if (
      !orderData.name ||
      !orderData.surname ||
      !orderData.address ||
      !orderData.zipcode ||
      !orderData.city ||
      !orderData.phoneNumber
    ) {
      throw new Error('Some information were not given');
    }

    this.checkoutService
      .sendOrder({
        address: orderData,
        products: this.products,
        total: this.total,
      })
      .pipe(
        switchMap(() => {
          return this.cartService.modifyCart([]);
        }),
        switchMap(() => {
          return this.router.navigate(['../', 'orders'], {
            relativeTo: this.route,
          });
        }),
        takeUntil(this.ngUnsubscribe$$)
      )
      .subscribe();
  }

  private downloadCart(): Observable<Products> {
    return this.cartService.downloadCart().pipe(
      tap((responseProducts) => {
        const total = responseProducts.products.reduce((prv, acc) => {
          return prv + acc.amount! * acc.price;
        }, 0);
        this.total = total;

        this.products = responseProducts.products;
      }),
      takeUntil(this.ngUnsubscribe$$)
    );
  }
}
