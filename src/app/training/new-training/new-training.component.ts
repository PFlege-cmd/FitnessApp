import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Exercise} from '../exercise.model';
import {TrainingService} from '../training.service';
import {Observable} from "rxjs";
import {UiService} from "../../shared/ui.service";
import * as fromApp from '../../app.reducer';
import * as fromTraining from '../training.reducer';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() startedTraining = new EventEmitter<void>();
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromTraining.State>) {
  }

  ngOnInit(): void {
    this.fetchExercises();
    this.isLoading$ = this.store.select(fromApp.getIsLoading)
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises)
  }

  startNewTraining(form: NgForm){
    this.trainingService.setCurrentExercise(form.value.exercise.id);
  }
}
