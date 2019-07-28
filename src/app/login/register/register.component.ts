import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AvatarsComponent } from '../avatars/avatars.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login.less', './register.component.less'],
})
export class RegisterComponent implements OnInit {
  animal: string;
  name: string;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AvatarsComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
