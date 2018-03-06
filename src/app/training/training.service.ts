import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class TrainingService {
    private availableExercises: Exercise[] = [];
    private exercises: Exercise[] = [];
    private runningExercise: Exercise;
    public trainingSelected$ = new Subject<Exercise>();
    public exercisesChanged$ = new Subject<Exercise[]>();
    public pastExercisesChanged$ = new Subject<Exercise[]>();

    constructor(private db: AngularFirestore) { }

    fetchAvailableExercises() {
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
                this.exercisesChanged$.next(exercises);
            });
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    startExercise(id: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === id);
        console.log(id);
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
        this.db.collection('pastExercises').valueChanges().subscribe(
            (exercises: Exercise[]) => this.pastExercisesChanged$.next(exercises)
        );
    }

    private storeExercise(exercise: Exercise) {
        this.db.collection('pastExercises').add(exercise);
    }


}
