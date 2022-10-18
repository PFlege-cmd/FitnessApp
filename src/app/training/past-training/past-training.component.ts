import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  finishedExercisesSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }


  ngOnInit(): void {
    this.finishedExercisesSubscription = this.trainingService.finishedExercisesSubject.subscribe(exercises => {
      console.log(exercises);
      this.dataSource.data = exercises
    });
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: any){
    this.dataSource.filter = (filterValue as HTMLInputElement).value.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    if (this.finishedExercisesSubscription){
      this.finishedExercisesSubscription.unsubscribe();
    }
  }
}
