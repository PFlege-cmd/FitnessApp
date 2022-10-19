import {Action} from "@ngrx/store";
import {Exercise} from "./exercise.model";

export const SET_AVAILABLE_EXERCISES = '[TRAINING] SET AUTHENTICATED';
export const SET_FINISHED_EXERCISES = '[TRAINING] SET UNAUTHENTICATED';
export const START_TRAINING = '[TRAINING] START TRAINING';
export const STOP_TRAINING = '[TRAINING] STOP TRAINING'


export class SetAvailableExercises implements Action {

  constructor(public payload: Exercise[]){}
  readonly type = SET_AVAILABLE_EXERCISES
}

export class SetFinishedExercises implements Action {

  constructor(public payload: Exercise[]){}
  readonly type = SET_FINISHED_EXERCISES
}

export class StartTraining implements Action {

  constructor(public payload: string) {}
  readonly type = START_TRAINING;
}

export class StopTraining implements Action {

  readonly type = STOP_TRAINING;
}

export type TrainingActions = SetAvailableExercises | SetFinishedExercises | StartTraining | StopTraining;


