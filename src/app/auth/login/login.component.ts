import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../../shared/ui.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  loadingSub: Subscription;

  constructor(private authService: AuthService, private uiSvc: UIService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // this.loadingSub = this.uiSvc.loadingStateChanged.subscribe(loading => this.isLoading = loading);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] })
    });
  }

  onLogin() {
    this.authService.loginUser({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

  ngOnDestroy() {
    // if (this.loadingSub) {
    //   this.loadingSub.unsubscribe();
    // }
  }
}

