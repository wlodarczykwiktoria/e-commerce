import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class NavigationService {
  private loggedUserNav$$ = new Subject();

  loggedUserNav$ = this.loggedUserNav$$.asObservable();

  updateNavTab(): void {
    this.loggedUserNav$$.next('');
  }
}
