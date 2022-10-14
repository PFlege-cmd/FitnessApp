import { Subject } from "rxjs";
import { Exercise } from "./exercise.model";

export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  private completedorCancelledExercises: Exercise[] = [];
  private currentExercise: Exercise;
  trainingSubject = new Subject<Exercise>();

  getAvailableExercises(){
    return this.availableExercises.slice();
  }

  setCurrentExercise(id: string){
    this.currentExercise = this.availableExercises.find(ex => ex.id === id);
    this.trainingSubject.next({...this.currentExercise})
  }

  getCurrentExercise(){
    return {...this.currentExercise };
  }

  completeExercise(){
    this.completedorCancelledExercises.push({
      ...this.currentExercise,
      date: new Date(),
      state: 'completed'
    });
    this.currentExercise = null;
    this.trainingSubject.next(null);
  }

  cancelExercise(progress: number){
    this.completedorCancelledExercises.push({...this.currentExercise,
      date: new Date(),
      duration: this.currentExercise.duration*progress/100,
      calories: this.currentExercise.calories*progress/100,
      state: 'cancelled'
    });
    this.currentExercise = null;
    this.trainingSubject.next(null);
  }

  getCompletedOrCancelledExercises(){
    return this.completedorCancelledExercises.slice();
  }
}
