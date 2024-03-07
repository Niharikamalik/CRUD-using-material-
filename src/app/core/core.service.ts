import { Injectable } from '@angular/core';
import { SanityChecks } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private _snackBar: MatSnackBar) {}
  openSnackBar(message:any,action:any) {
    this._snackBar.open(message,action, {
      duration: 1000,
      verticalPosition: 'top',
    });
  }
}
