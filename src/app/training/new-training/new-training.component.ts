import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() startedTraining = new EventEmitter<void>();
  exercises: Exercise[];

  constructor(private trainingService: TrainingService) {
    this.exercises = trainingService.getAvailableExercises();
  }

  ngOnInit(): void {
  }

  startNewTraining(form: NgForm){
    console.log(form);
    this.trainingService.setCurrentExercise(form.value.exercise.id);
  }
}
