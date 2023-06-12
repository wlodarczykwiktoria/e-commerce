import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation.service';

export interface UserAndToken {
  accessToken: string;
  user: {
    email: string;
    id: string;
    username: string;
  };
}

@Injectable()
export class LoginService {
  constructor(
    protected httpClient: HttpClient,
    private navService: NavigationService
  ) {}

  login(loginData: {
    email: string;
    password: string;
  }): Observable<UserAndToken> {
    return this.httpClient
      .post<UserAndToken>(`http://localhost:3000/login`, loginData)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('userId', res.user.id);
          this.navService.updateNavTab();
        })
      );
  }

  register(registerData: {
    email: string;
    username: string;
    password: string;
  }): Observable<UserAndToken> {
    return this.httpClient
      .post<UserAndToken>(`http://localhost:3000/register`, registerData)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('userId', res.user.id);
          this.navService.updateNavTab();
        })
      );
  }
}
