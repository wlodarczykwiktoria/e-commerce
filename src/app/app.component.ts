import { Component, OnInit } from '@angular/core';
import { NavigationService } from './shared/services/navigation.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { CartService } from './components/cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private ngUnsubscribe$$ = new Subject();

  constructor(
    private navService: NavigationService,
    private cartService: CartService
  ) {}

  showNavTabs?: boolean;
  cartAmount: number = 0;

  ngOnInit(): void {
    this.setNatTabs();
    this.navService.updateNavTab();

    this.setCartAmount();
    this.cartService.updateCartAmount(
      Number(localStorage.getItem('cartAmount'))
    );
  }

  logout(): void {
    if (this.showNavTabs) {
      localStorage.clear();
      this.navService.updateNavTab();
    }
  }

  setNatTabs(): void {
    this.navService.loggedUserNav$
      .pipe(
        tap(() => {
          if (!localStorage.getItem('token')) {
            this.showNavTabs = false;
            return;
          }
          this.showNavTabs = true;
        }),
        takeUntil(this.ngUnsubscribe$$)
      )
      .subscribe();
  }

  setCartAmount(): void {
    this.cartService.cartAmount$
      .pipe(
        tap((res) => {
          this.cartAmount = res;
        }),
        takeUntil(this.ngUnsubscribe$$)
      )
      .subscribe();
  }
}
