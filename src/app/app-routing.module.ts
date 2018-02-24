import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './core/welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';

const appRoutes: Routes = [
    {path: '', component: WelcomeComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
