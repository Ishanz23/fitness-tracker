import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject';

export class TrainingService {
    private availableExercises: Exercise[] = [
        { id: 'crucnches', name: 'Crunches', duration: 10, calories: 300 },
        { id: 'touchToes', name: 'Touch Toes', duration: 20, calories: 100 },
        { id: 'sideLunges', name: 'Side Lunges', duration: 30, calories: 240 },
        { id: 'burpees', name: 'Burpees', duration: 5, calories: 200 }
    ];

    private exercises: Exercise[] = [];
    private runningExercise: Exercise;
    public trainingSelected$ = new Subject<Exercise>();

    getAvailableExercises() {
        return this.availableExercises.slice();
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
        this.exercises.push({ ...this.runningExercise, date: new Date(), state: 'completed' });
        this.runningExercise = null;
        this.trainingSelected$.next(null);
    }

    cancelExercise(progress: number) {
        this.exercises.push({
            ...this.runningExercise,
            date: new Date(),
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.trainingSelected$.next(null);
    }

    getCompletedOrCancelledExercises() {
        return this.exercises.slice();
    }


}
