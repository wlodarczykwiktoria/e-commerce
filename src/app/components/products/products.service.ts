import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../../shared/models/model';

@Injectable()
export class ProductsService {
  constructor(protected httpClient: HttpClient) {}

  downloadProducts(): Observable<Products> {
    return this.httpClient.get<Products>(`http://localhost:3000/products`);
  }
}
