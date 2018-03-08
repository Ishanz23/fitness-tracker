import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './shared/material.module';

import { AppComponent } from './app.component';

import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { UIService } from './shared/ui.service';

import { environment } from '../environments/environment';
import { SidenavListComponent } from './core/navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './core/navigation/header/header.component';
import { WelcomeComponent } from './core/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    AuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
