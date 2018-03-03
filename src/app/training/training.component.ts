import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs/Subscription';
import { Exercise } from './exercise.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  trainingSubscription: Subscription;

  constructor(private trainingSvc: TrainingService) { }

  ngOnInit() {
    this.trainingSubscription = this.trainingSvc.trainingSelected$.subscribe(
      (exercise: Exercise) => {
        if (exercise) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      }
    );
  }

  onQuitTraining() {
    this.ongoingTraining = false;
  }

  ngOnDestroy() {
    this.trainingSubscription.unsubscribe();
  }
}
