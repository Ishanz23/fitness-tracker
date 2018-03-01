import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingQuit = new EventEmitter<void>();
  progress = 0;
  timer: any;
  paused = false;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.startOrResumeTraining();
  }

  startOrResumeTraining() {
    this.timer = setInterval(
      () => {
        if (this.progress < 100) {
          this.progress = this.progress + 1;
        }
        if (this.progress >= 100) {
          clearInterval(this.timer);
        }
      }
      , 50);
  }

  onPauseOrResume() {
    if (this.paused) {
      this.startOrResumeTraining();
    } else {
      clearInterval(this.timer);
    }
    this.paused = !this.paused;
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.trainingQuit.emit();
        } else {
          this.startOrResumeTraining();
        }

      }
    );
  }

}
