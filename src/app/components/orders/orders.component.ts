import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderInformation } from '../../shared/models/model';
import { OrdersService } from './orders.service';
import { Subject, Observable, tap, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from 'src/app/shared/services/routing.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrdersService],
})
export class OrdersComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$$ = new Subject();

  orders: OrderInformation[] = [];

  constructor(
    private ordersService: OrdersService,
    private router: RoutingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.downloadOrders().subscribe();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$$.next('');
    this.ngUnsubscribe$$.complete();
  }

  goToProducts(): void {
    this.router.navigate(['../', 'products'], {
      relativeTo: this.route,
    });
  }

  private downloadOrders(): Observable<OrderInformation[]> {
    return this.ordersService.downloadOrders().pipe(
      tap((orders) => {
        this.orders = orders;
      }),
      takeUntil(this.ngUnsubscribe$$)
    );
  }
}
