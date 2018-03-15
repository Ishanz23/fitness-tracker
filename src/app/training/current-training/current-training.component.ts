import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import * as fromTraining from '../training.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  exerciseName = '';
  progress = 0;
  timer: any;
  paused = false;

  constructor(private dialog: MatDialog, private traingSvc: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.startOrResumeTraining();
  }

  startOrResumeTraining() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(exercise => {
      this.exerciseName = exercise.name;
      const step = (exercise.duration / 100) * 1000;
      this.timer = setInterval(
        () => {
          if (this.progress < 100) {
            this.progress = this.progress + 1;
          }
          if (this.progress >= 100) {
            clearInterval(this.timer);
            this.traingSvc.completeExercise();
          }
        }
        , step);
    });

  }

  onPauseOrResume() {
    if (this.paused) {
      this.startOrResumeTraining();
    } else {
      clearInterval(this.timer);
    }
    this.paused = !this.paused;
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.traingSvc.cancelExercise(this.progress);
        } else {
          this.startOrResumeTraining();
        }

      }
    );
  }

}
