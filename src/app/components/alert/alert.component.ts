import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

export interface DialogData {
  message: string;
  login: boolean;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less'],
})
export class AlertComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<AlertComponent>,
    private readonly router: Router,
  ) {}

  ngOnInit() {}

  handleGotoLogin() {
    this.router.navigate(['/login']);
  }

  handleClose() {
    this.dialogRef.close();
  }
}
