import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavClose = new EventEmitter<void>();
  isAuth: boolean;
  authSub: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuth = false;
    this.authSub = this.authService.authChanged.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  onSidenavClose() {
    this.sidenavClose.emit();
  }

  onLogout() {
    this.onSidenavClose();
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
