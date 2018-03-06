import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
  public authChanged = new Subject<boolean>();
  private user: User;

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(response => {
        console.log(response);
        this.authSuccessfully();
      })
      .catch(error => console.error(error));
    this.user = {
      email: authData.email,
      userId: (Math.random() * 10000).toString()
    };
  }

  loginUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: (Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  getUser() {
    return { ...this.user };
  }

  logout() {
    this.user = undefined;
    this.authChanged.next(false);
    this.router.navigate(['/login']);
  }

  authSuccessfully() {
    this.authChanged.next(true);
    this.router.navigate(['/training']);
  }

  isAuth() {
    return this.user !== undefined;
  }

}
