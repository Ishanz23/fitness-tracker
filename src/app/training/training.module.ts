import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { TrainingComponent } from './training.component';
import { TrainingRoutingModule } from './training-routing.module';
import { NewTrainingComponent } from './new-training/new-training.component';
import { StopTrainingComponent } from './current-training/stop-training/stop-training.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        PastTrainingsComponent,
        NewTrainingComponent,
        StopTrainingComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        TrainingRoutingModule
    ],
    exports: [
        TrainingRoutingModule,
        TrainingComponent,
        CurrentTrainingComponent,
        PastTrainingsComponent,
        NewTrainingComponent,
        StopTrainingComponent
    ],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule { }
