import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

    constructor(private router: Router, private store: Store<fromRoot.State>) { }

    canLoad(route: Route) {
        return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
    }
}
