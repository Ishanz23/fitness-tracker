import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import * as fromTraining from './training.reducer';
import { take } from 'rxjs/operators';

@Injectable()
export class TrainingService {
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
                }, error => {
                    this.store.dispatch(new UI.StopLoading());
                    this.uiSvc.showSnackBar('Failed To load Exercises! Try again later.', null, 4000);
                    this.store.dispatch(new Training.SetAvailableExercises([]));
                })
        );
    }

    startExercise(id: string) {
        this.store.dispatch(new Training.StartTraining(id));
    }

    completeExercise() {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(exercise => {
            this.storeExercise({ ...exercise, date: new Date(), state: 'completed' });
            this.store.dispatch(new Training.StopTraining());
        });
    }

    cancelExercise(progress: number) {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(exercise => {
            this.storeExercise({
                ...exercise,
                date: new Date(),
                duration: exercise.duration * (progress / 100),
                calories: exercise.calories * (progress / 100),
                state: 'cancelled'
            });
            this.store.dispatch(new Training.StopTraining());
        });
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
