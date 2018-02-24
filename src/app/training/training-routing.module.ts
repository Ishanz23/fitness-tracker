import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';
import { NgModule } from '@angular/core';

const trainingRoutes: Routes = [
    { path: 'training', component: TrainingComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(trainingRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class TrainingRoutingModule {

}
