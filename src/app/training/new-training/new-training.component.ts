import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  runningExerciseId = '';
  isLoading$: Observable<boolean>;
  // loadingSub: Subscription;

  constructor(private trainingSvc: TrainingService,
    private db: AngularFirestore,
    private store: Store<fromRoot.State>,
    private uiSvc: UIService) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.loadingSub = this.uiSvc.loadingStateChanged.subscribe(loading => this.isLoading = loading);
    this.fetchExercises();
    this.exerciseSubscription = this.trainingSvc.exercisesChanged$.subscribe(ex => this.exercises = ex);
  }

  fetchExercises() {
    this.trainingSvc.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingSvc.startExercise(form.value.selectedExerciseId);
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    // if (this.loadingSub) {
    //   this.loadingSub.unsubscribe();
    // }
  }
}
