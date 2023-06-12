import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderInformationToSend } from '../../shared/models/model';

@Injectable()
export class CheckoutService {
  constructor(protected httpClient: HttpClient) {}

  sendOrder(orderInformation: OrderInformationToSend): Observable<unknown> {
    return this.httpClient.post<unknown>(
      `http://localhost:3000/orders`,
      { orderInformation, userId: localStorage.getItem('userId') },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }
}
