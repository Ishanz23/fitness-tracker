import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  runningExerciseId = '';
  isLoading = false;
  loadingSub: Subscription;

  constructor(private trainingSvc: TrainingService, private db: AngularFirestore, private uiSvc: UIService) { }

  ngOnInit() {
    this.loadingSub = this.uiSvc.loadingStateChanged.subscribe( loading => this.isLoading = loading);
    this.trainingSvc.fetchAvailableExercises();
    this.exerciseSubscription = this.trainingSvc.exercisesChanged$.subscribe(ex => this.exercises = ex);
  }

  onStartTraining(form: NgForm) {
    this.trainingSvc.startExercise(form.value.selectedExerciseId);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
    this.loadingSub.unsubscribe();
  }
}
