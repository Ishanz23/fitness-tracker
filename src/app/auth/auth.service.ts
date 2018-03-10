import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable()
export class AuthService {
  public authChanged = new Subject<boolean>();
  private isAuth = false;

  constructor(private router: Router,
    private afAuth: AngularFireAuth,
    private trainingSvc: TrainingService,
    private uiSvc: UIService,
    private snackBar: MatSnackBar,
    private store: Store<fromRoot.State>) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuth = true;
        this.authChanged.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingSvc.cancelSubscription();
        this.isAuth = false;
        this.authChanged.next(false);
        this.router.navigate(['/']);
      }
    });
  }
  registerUser(authData: AuthData) {
    // this.uiSvc.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(response => {
        // this.uiSvc.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiSvc.showSnackBar('Registration Successful!', null, 3000);
      })
      .catch(error => {
        // this.uiSvc.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiSvc.showSnackBar(error.message, null, 3000);
      });
  }

  loginUser(authData: AuthData) {
    // this.uiSvc.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(response => {
        // this.uiSvc.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiSvc.showSnackBar('Login Successful!', null, 3000);
      })
      .catch(error =>  {
        // this.uiSvc.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiSvc.showSnackBar(error.message, null, 3000);
      });
  }

  logout() {
    this.trainingSvc.cancelSubscription();
    this.afAuth.auth.signOut();
  }

  isAuthenticated() {
    return this.isAuth;
  }

}
