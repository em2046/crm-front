import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import Utils from '../../../utils/utils';
import { AvatarsComponent } from '../avatars/avatars.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login.less', './register.component.less'],
})
export class RegisterComponent implements OnInit {
  Utils = Utils;
  avatar: number;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AvatarsComponent, {
      width: '75vw',
      minWidth: '400px',
      data: { animal: this.avatar },
    });

    dialogRef.afterClosed().subscribe(code => {
      console.log('The dialog was closed');
      this.avatar = code;
    });
  }
}
