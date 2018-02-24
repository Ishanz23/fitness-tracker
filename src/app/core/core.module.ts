import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';

@NgModule({
    declarations: [
        WelcomeComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ]
})
export class CoreModule {

}
