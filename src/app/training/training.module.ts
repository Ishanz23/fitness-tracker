import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { TrainingComponent } from './training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { NewTrainingComponent } from './new-training/new-training.component';


@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        PastTrainingsComponent,
        NewTrainingComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TrainingRoutingModule
    ],
    exports: [
        TrainingRoutingModule,
        TrainingComponent,
        CurrentTrainingComponent,
        PastTrainingsComponent,
        NewTrainingComponent
    ]
})
export class TrainingModule { }
