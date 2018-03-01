import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
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

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
