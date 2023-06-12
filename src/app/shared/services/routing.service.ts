import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

type RouterNavigateParams = Parameters<typeof Router.prototype.navigate>;
type RouterNavigateReturnType = ReturnType<typeof Router.prototype.navigate>;

@Injectable()
export class RoutingService {
  constructor(private router: Router, private location: Location) {}

  navigate(...params: RouterNavigateParams): RouterNavigateReturnType {
    return this.router.navigate(...params);
  }

  goBack(): void {
    this.location.back();
  }
}
