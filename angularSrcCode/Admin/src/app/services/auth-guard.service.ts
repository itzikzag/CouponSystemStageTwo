import { AdminService } from './admin.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import 'rxjs/add/operator/do';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private service: AdminService) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.service.loginCheck()
      .do(loggedIn => {
        if (!loggedIn) {
          window.location.href = '../././auth/unauthorized.html';
        }
      });
  }

}

