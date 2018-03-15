import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { AngularFirestore } from 'angularfire2/firestore';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(private trainingSvc: TrainingService,
    private db: AngularFirestore,
    private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.fetchExercises();
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
  }

  fetchExercises() {
    this.trainingSvc.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingSvc.startExercise(form.value.selectedExerciseId);
  }
}
