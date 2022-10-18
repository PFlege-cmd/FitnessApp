import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import {Subscription} from "rxjs";
import {UiService} from "../../shared/ui.service";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  @Output() startedTraining = new EventEmitter<void>();
  exercises: Exercise[];
  isLoading = true;
  isLoadingSubscription: Subscription;

  constructor(
    private trainingService: TrainingService, private uiService: UiService) {
  }

  ngOnInit(): void {
    this.fetchExercises();
    this.isLoadingSubscription = this.uiService.loadingSubject.subscribe(loading => {
      this.isLoading = loading;
    })
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
    this.trainingService.exercisesSubject.subscribe(exerciseArray => this.exercises = exerciseArray);
  }

  startNewTraining(form: NgForm){
    console.log(form);
    this.trainingService.setCurrentExercise(form.value.exercise.id);
  }

  ngOnDestroy(): void {
    if (this.isLoadingSubscription){
      this.isLoadingSubscription.unsubscribe();
    }
  }
}
