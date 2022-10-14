import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer: number = 0;
  setAndCheckTimer() {
    const stepDuration = this.currentExercise.duration/100*1000;
    this.timer = setInterval(()=>{
      this.progress = this.progress + 5;
      if(this.progress >= 100){
        clearInterval(this.timer);
        this.trainingService.completeExercise();
        }
  }, stepDuration)
  }
  currentExercise: Exercise;

  constructor(private dialog: MatDialog, private trainingService: TrainingService) {
    this.currentExercise = trainingService.getCurrentExercise();
   }

  ngOnInit(): void {
    this.setAndCheckTimer();
  }

  onStop(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent,
      {
        data: {
          progress: this.progress,
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (!result){
        this.setAndCheckTimer();
      } else {
        this.trainingService.cancelExercise(this.progress);
      }
    })
  }

}
