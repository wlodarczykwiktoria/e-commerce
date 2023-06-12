import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderInformation } from '../../shared/models/model';

@Injectable()
export class OrdersService {
  constructor(protected httpClient: HttpClient) {}

  downloadOrders(): Observable<OrderInformation[]> {
    return this.httpClient.get<OrderInformation[]>(
      `http://localhost:3000/orders?userId=${localStorage.getItem('userId')}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }
}
