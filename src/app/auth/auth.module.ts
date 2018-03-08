import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        AngularFireAuthModule
    ],
    exports: [
        AuthRoutingModule,
        SignupComponent,
        LoginComponent
    ]
})
export class AuthModule { }
