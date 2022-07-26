import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Exercise } from './exercise.model';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  ongoingTraining = false;
  trainingSubscription: Subscription;

  constructor(private trainingService: TrainingService) {
    this.trainingSubscription = trainingService
    .trainingSubject
    .subscribe(exercise => {
        this.ongoingTraining = exercise?true:false;
    })
   }

  ngOnDestroy(): void {
        if (this.trainingSubscription){
          this.trainingSubscription.unsubscribe();
        }
    }

  ngOnInit(): void {
  }


}
