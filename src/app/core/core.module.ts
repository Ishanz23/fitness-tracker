import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
    declarations: [
        WelcomeComponent,
        HeaderComponent,
        SidenavListComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        WelcomeComponent,
        HeaderComponent,
        SidenavListComponent
    ]
})
export class CoreModule {

}
