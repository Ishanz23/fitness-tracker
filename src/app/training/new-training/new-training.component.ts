import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[];
  runningExerciseId = '';
  constructor(private trainingSvc: TrainingService) { }

  ngOnInit() {
    this.exercises = this.trainingSvc.getAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    console.log(form.value.selectedExerciseId);
    this.trainingSvc.startExercise(form.value.selectedExerciseId);
  }
}
