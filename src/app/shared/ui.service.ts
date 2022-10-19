import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UiService {

  loadingSubject: Subject<boolean> = new Subject<boolean>()

  constructor(private matSnackBar: MatSnackBar) { }

  showSnackbar(message: string, action: string, duration: number){
    this.matSnackBar.open(message, action, {
      duration: duration
    })
  }
}
