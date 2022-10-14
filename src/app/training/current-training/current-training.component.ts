import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer: number = 0;
  setAndCheckTimer() {
    this.timer = setInterval(()=>{
      this.progress = this.progress + 5;
      if(this.progress >= 100){
        clearInterval(this.timer);
        }
  }, 500)
  }
  @Output() isClosed = new EventEmitter<boolean>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.setAndCheckTimer();
  }

  onStop(){
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent,
      {
        data: {
          progress: this.progress,
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.isClosed.emit(result);
      if (!result){
        this.setAndCheckTimer();
      }
    })
  }

}
