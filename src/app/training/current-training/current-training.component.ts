import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Exercise} from '../exercise.model';
import {TrainingService} from '../training.service';
import {StopTrainingComponent} from './stop-training.component';
import * as fromTraining from './../training.reducer';
import {Store} from "@ngrx/store";
import {take} from "rxjs";

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer: ReturnType<typeof setTimeout>;

  constructor(private dialog: MatDialog,
              private trainingService: TrainingService,
              private store: Store<fromTraining.State>) {
   }

  ngOnInit(): void {
    this.setAndCheckTimer();
  }

  setAndCheckTimer() {
    this.store.select(fromTraining.getCurrentExercise).pipe(take(1)).subscribe(exercise => {
      const stepDuration = exercise.duration/100*1000;
      this.timer = setInterval(()=>{
        this.progress = this.progress + 5;
        if(this.progress >= 100){
          clearInterval(this.timer);
          this.trainingService.completeExercise();
        }
      }, stepDuration);
    })
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
