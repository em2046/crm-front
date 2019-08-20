import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AlertComponent } from '../core/alert/alert.component';

export interface AlertOptions {
  message: string;
  login: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(public snackBar: MatSnackBar, public dialog: MatDialog) {}

  dialogRef;
  dialogQueue = [];

  snack(message) {
    this.snackBar.open(message, '关闭', {
      duration: 1000,
    });
  }

  alert(options: string | AlertOptions) {
    if (typeof options === 'string') {
      this.alertSimple(options);
    } else {
      this.alertComplete(options);
    }
  }

  alertSimple(message) {
    this.alertComplete({
      message,
    });
  }

  alertComplete(options) {
    this.dialogQueue.unshift(options);
    this.showAlert();
  }

  showAlert() {
    if (!this.dialogQueue.length) {
      return;
    }
    if (this.dialogRef) {
      return;
    }
    const options = this.dialogQueue.shift();

    this.dialogRef = this.dialog.open(AlertComponent, {
      width: '50vw',
      minWidth: '400',
      data: {
        message: options.message,
        login: options.login || false,
      },
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.dialogRef = null;
      this.showAlert();
    });
  }

  clean() {
    this.dialogQueue = [];
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
