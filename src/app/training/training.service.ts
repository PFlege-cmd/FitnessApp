import {map, Subscription, take} from "rxjs";
import {Exercise} from "./exercise.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Injectable} from "@angular/core";
import {UiService} from "../shared/ui.service";
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import {Store} from "@ngrx/store";
import {SetAvailableExercises, SetFinishedExercises, StartTraining, StopTraining} from "./training.actions";

@Injectable()
export class TrainingService {
  fireBaseSubscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UiService, private store: Store<fromTraining.State>){}

  fetchAvailableExercises(){
    this.store.dispatch(new UI.UiStartAction());
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
        this.store.dispatch(new SetAvailableExercises(ex))
        console.log(ex);
        this.store.dispatch(new UI.UiStopAction());
      }, error => {
        this.store.dispatch(new UI.UiStopAction());
        this.uiService.showSnackbar(error.message, null, 3000);
        this.store.dispatch(new SetAvailableExercises(null))
      }))
  }

  setCurrentExercise(id: string){
    this.db.doc('availableExecises/'+id).update({lastSelected: new Date()});
    this.store.dispatch(new StartTraining(id));
  }

  completeExercise(){
    this.store.select(fromTraining.getCurrentExercise).pipe(take(1)).subscribe(exercise => {
      this.addDataToDatabase({
        ...exercise,
        date: new Date(),
        state: 'completed'
      });
      this.store.dispatch(new StopTraining())
    })
  }

  cancelExercise(progress: number){
    this.store.select(fromTraining.getCurrentExercise).pipe(take(1)).subscribe(exercise => {
    this.addDataToDatabase({...exercise,
      date: new Date(),
      duration: exercise.duration*progress/100,
      calories: exercise.calories*progress/100,
      state: 'cancelled'
    });
    this.store.dispatch(new StopTraining());
    })
  }

  private addDataToDatabase(exercise: Exercise){
    this.db.collection('completedOrCancelledExercises').add(exercise);
  }

  fetchCompletedOrCancelledExercises(){
    this.fireBaseSubscriptions.push(
      (this.db.collection('completedOrCancelledExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
      this.store.dispatch(new SetFinishedExercises(exercises))
    })));
  }

  cancelSubscriptions(){
    this.fireBaseSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }
}
