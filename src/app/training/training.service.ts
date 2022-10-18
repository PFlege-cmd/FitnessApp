import {map, Subject, Subscription} from "rxjs";
import { Exercise } from "./exercise.model";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {Injectable} from "@angular/core";
import {UiService} from "../shared/ui.service";

@Injectable()
export class TrainingService {
  private availableExercises: Exercise[] = [];
  private completedOrCancelledExercises: Exercise[] = [];
  private currentExercise: Exercise;
  trainingSubject = new Subject<Exercise>();
  exercisesSubject = new Subject<Exercise[]>();
  finishedExercisesSubject = new Subject<Exercise[]>();
  fireBaseSubscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UiService){}

  fetchAvailableExercises(){
    this.uiService.loadingSubject.next(true);
    this.fireBaseSubscriptions.push(this.db.collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(res => {
            return res.map(r => {
                return {
                  id: r.payload.doc.id,
                  name: r.payload.doc.data()['name'],
                  duration: r.payload.doc.data()['duration'],
                  calories: r.payload.doc.data()['calories']
                }
              }
            )
          }
        )
      ).subscribe(ex => {
        this.availableExercises = ex;
        this.exercisesSubject.next([...ex]);
        this.uiService.loadingSubject.next(false);
      }, error => {
        this.uiService.loadingSubject.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
        this.exercisesSubject.next(null);
      }))
  }

  setCurrentExercise(id: string){
    this.db.doc('availableExecises/'+id).update({lastSelected: new Date()});
    this.currentExercise = this.availableExercises.find(ex => ex.id === id);
    this.trainingSubject.next({...this.currentExercise})
  }

  getCurrentExercise(){
    return {...this.currentExercise };
  }

  completeExercise(){
    this.addDataToDatabase({
      ...this.currentExercise,
      date: new Date(),
      state: 'completed'
    });
    this.currentExercise = null;
    this.trainingSubject.next(null);
  }

  cancelExercise(progress: number){
    this.addDataToDatabase({...this.currentExercise,
      date: new Date(),
      duration: this.currentExercise.duration*progress/100,
      calories: this.currentExercise.calories*progress/100,
      state: 'cancelled'
    });
    this.currentExercise = null;
    this.trainingSubject.next(null);
  }

  private addDataToDatabase(exercise: Exercise){
    this.db.collection('completedOrCancelledExercises').add(exercise);
  }

  fetchCompletedOrCancelledExercises(){
    this.fireBaseSubscriptions.push(
      (this.db.collection('completedOrCancelledExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
      this.finishedExercisesSubject.next(exercises);
    })));
  }

  cancelSubscriptions(){
    this.fireBaseSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }
}
