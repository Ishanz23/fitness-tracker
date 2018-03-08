import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {
    private availableExercises: Exercise[] = [];
    private exercises: Exercise[] = [];
    private runningExercise: Exercise;
    public trainingSelected$ = new Subject<Exercise>();
    public exercisesChanged$ = new Subject<Exercise[]>();
    public pastExercisesChanged$ = new Subject<Exercise[]>();
    private fbSubs: Subscription[] = [];

    constructor(private db: AngularFirestore, private uiSvc: UIService) { }

    fetchAvailableExercises() {
        this.uiSvc.loadingStateChanged.next(true);
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
                    this.availableExercises = exercises;
                    this.uiSvc.loadingStateChanged.next(false);
                    this.exercisesChanged$.next(exercises);
                }, error => {
                    this.uiSvc.showSnackBar('Failed To load Exercises! Try again later.', null, 4000);
                    this.uiSvc.loadingStateChanged.next(false);
                    this.exercisesChanged$.next(null);
                })
        );
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    startExercise(id: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === id);
        this.trainingSelected$.next({ ...this.runningExercise });
    }

    completeExercise() {
        this.storeExercise({ ...this.runningExercise, date: new Date(), state: 'completed' });
        this.runningExercise = null;
        this.trainingSelected$.next(null);
    }

    cancelExercise(progress: number) {
        this.storeExercise({
            ...this.runningExercise,
            date: new Date(),
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.trainingSelected$.next(null);
    }

    fetchCompletedOrCancelledExercises() {
        this.fbSubs.push(
            this.db.collection('pastExercises').valueChanges().subscribe(
                (exercises: Exercise[]) => this.pastExercisesChanged$.next(exercises)
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
