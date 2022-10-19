import * as fromRoot from './../app.reducer';
import {Exercise} from "./exercise.model";
import {
  SET_AVAILABLE_EXERCISES,
  SET_FINISHED_EXERCISES,
  START_TRAINING,
  STOP_TRAINING,
  TrainingActions
} from "./training.actions";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  currentExercise: Exercise | null
}

// Why does this work? Because the trainings are lazily loaded (fetched from the server asynchronously, whenever we need them)
// Angular extends the original state defined at the root at runtime, as soon as the component is loaded

export interface State extends fromRoot.State
{
  training: TrainingState
}


const initialState: TrainingState = {
  availableExercises : [],
  finishedExercises : [],
  currentExercise: null
}

export function trainingReducer(state = initialState, action: TrainingActions): TrainingState {
  switch(action.type){
    case SET_AVAILABLE_EXERCISES:
      console.log("In reducer");
      console.log(action.payload);
      const newState: TrainingState = {
        availableExercises: action.payload,
        currentExercise: state.currentExercise,
        finishedExercises: state.finishedExercises
      };
      return newState;
    case SET_FINISHED_EXERCISES:
      return {
        finishedExercises: action.payload,
        availableExercises: state.availableExercises,
        currentExercise: state.currentExercise
      };
    case START_TRAINING:
      return {
        currentExercise: state.availableExercises.find(exercise =>
          action.payload===exercise.id),
        finishedExercises: state.finishedExercises,
        availableExercises: state.availableExercises
      };
    case STOP_TRAINING:
      return {
        currentExercise: null,
        finishedExercises: state.finishedExercises,
        availableExercises: state.availableExercises
      };
    default: {
      return state;
    }
  }
}

const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => {
  console.log("Selector called")
  console.log("SHOW STATE:");
  console.log(state);
  console.log(state.availableExercises)
  return state.availableExercises;
});
export const getFinishedExercises = createSelector(getTrainingState,(state: TrainingState) => state.finishedExercises);
export const getCurrentExercise = createSelector(getTrainingState,(state: TrainingState) => state.currentExercise);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.currentExercise !== null);
