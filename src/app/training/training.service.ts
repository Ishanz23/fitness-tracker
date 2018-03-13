import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import * as fromTraining from './training.reducer';

@Injectable()
export class TrainingService {
    private availableExercises: Exercise[] = [];
    private exercises: Exercise[] = [];
    private runningExercise: Exercise;
    public trainingSelected$ = new Subject<Exercise>();
    public exercisesChanged$ = new Subject<Exercise[]>();
    public pastExercisesChanged$ = new Subject<Exercise[]>();
    private fbSubs: Subscription[] = [];

    constructor(private db: AngularFirestore,
        private store: Store<fromTraining.State>,
        private uiSvc: UIService) { }

    fetchAvailableExercises() {
        this.store.dispatch(new UI.StartLoading());
        this.fbSubs.push(
            this.db.collection('availableExcercises').snapshotChanges()
                .map(docs => {
                    return docs.map(doc => {
                        return {
                            id: doc.payload.doc.id,
                            name: doc.payload.doc.data().name,
                            duration: doc.payload.doc.data().duration,
                            calories: doc.payload.doc.data().calories
                        };
                    });
                }).subscribe((exercises: Exercise[]) => {
                    this.store.dispatch(new UI.StopLoading());
                    this.store.dispatch(new Training.SetAvailableExercises(exercises));
                    this.availableExercises = exercises;
                    this.exercisesChanged$.next(exercises);
                }, error => {
                    this.store.dispatch(new UI.StopLoading());
                    this.uiSvc.showSnackBar('Failed To load Exercises! Try again later.', null, 4000);
                    this.store.dispatch(new Training.SetAvailableExercises([]));
                })
        );
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    startExercise(id: string) {
        this.store.dispatch(new Training.StartTraining(id));
    }

    completeExercise() {
        this.storeExercise({ ...this.runningExercise, date: new Date(), state: 'completed' });
        this.store.dispatch(new Training.StopTraining());
    }

    cancelExercise(progress: number) {
        this.storeExercise({
            ...this.runningExercise,
            date: new Date(),
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            state: 'cancelled'
        });
        this.store.dispatch(new Training.StopTraining());
    }

    fetchCompletedOrCancelledExercises() {
        this.fbSubs.push(
            this.db.collection('pastExercises').valueChanges().subscribe(
                (exercises: Exercise[]) => this.store.dispatch(new Training.SetCompletedExercises(exercises))
            )
        );
    }

    private storeExercise(exercise: Exercise) {
        this.db.collection('pastExercises').add(exercise);
    }

    public cancelSubscription() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }
}
