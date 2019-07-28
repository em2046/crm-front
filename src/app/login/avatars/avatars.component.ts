import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AvatarsService } from './avatars.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.less'],
})
export class AvatarsComponent implements OnInit {
  avatars;

  constructor(
    private avatarsService: AvatarsService,
    public dialogRef: MatDialogRef<AvatarsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.avatars = avatarsService.getAvatars();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  codeToEmoji(code) {
    return String.fromCodePoint(code);
  }

  ngOnInit(): void {}
}
