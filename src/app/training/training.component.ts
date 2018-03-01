import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining = false;
  constructor() { }

  ngOnInit() {
  }

  onTrainingStarted() {
    this.ongoingTraining = true;
  }

  onQuitTraining() {
    this.ongoingTraining = false;
  }

}
