import {NgModule} from "@angular/core";
import {NewTrainingComponent} from "./new-training/new-training.component";
import {PastTrainingComponent} from "./past-training/past-training.component";
import {CurrentTrainingComponent} from "./current-training/current-training.component";
import {StopTrainingComponent} from "./current-training/stop-training.component";
import {TrainingComponent} from "./training.component";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getDatabase, provideDatabase} from "@angular/fire/database";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {SharedModule} from "../shared/shared.module";
import {AuthRoutingModule} from "../auth/auth/auth-routing.module";
import {TrainingRoutingModule} from "./training-routing.module";

@NgModule({
  declarations: [
    TrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    CurrentTrainingComponent,
    StopTrainingComponent
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
  ],
  exports: [],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule{
}
