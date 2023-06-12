import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { RoutingService } from 'src/app/shared/services/routing.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FormBuilder, LoginService],
})
export class LoginComponent implements OnDestroy {
  private ngUnsubscribe$$ = new Subject();

  loginForm: FormGroup;
  registerForm: FormGroup;
  visibleLoginForm = true;

  constructor(
    private formb: FormBuilder,
    private loginService: LoginService,
    private router: RoutingService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    this.loginForm = this.formb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.registerForm = this.formb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$$.next('');
    this.ngUnsubscribe$$.complete();
  }

  login(event: Event): void {
    event.preventDefault();
    const loginData = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };
    if (!loginData.email || !loginData.password) {
      throw new Error('Username or password were not given');
    }

    this.loginService
      .login(loginData)
      .pipe(
        switchMap(() => {
          return this.router.navigate(['../', 'products'], {
            relativeTo: this.route,
          });
        }),

        takeUntil(this.ngUnsubscribe$$)
      )
      .subscribe();
  }

  register(event: Event): void {
    event.preventDefault();
    const registerData = {
      email: this.registerForm.controls['email'].value,
      username: this.registerForm.controls['username'].value,
      password: this.registerForm.controls['password'].value,
    };
    if (
      !registerData.username ||
      !registerData.password ||
      !registerData.email
    ) {
      throw new Error('Username, email or password were not given');
    }

    this.loginService
      .register(registerData)
      .pipe(
        switchMap(() => {
          return this.cartService.createUserCart();
        }),
        switchMap(() => {
          return this.router.navigate(['../', 'products'], {
            relativeTo: this.route,
          });
        }),
        takeUntil(this.ngUnsubscribe$$)
      )
      .subscribe();
  }

  changeFormVisibility(): void {
    this.visibleLoginForm = !this.visibleLoginForm;
  }
}
