import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { TrainingComponent } from './training.component';
import { TrainingRoutingModule } from './training-routing.module';


@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        PastTrainingsComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TrainingRoutingModule
    ]
})
export class TrainingModule { }
