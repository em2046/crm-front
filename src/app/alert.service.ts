import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(public snackBar: MatSnackBar) {
  }

  alert(message) {
    this.snackBar.open(message, '关闭', {
      duration: 3000,
    });
  }
}
