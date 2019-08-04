import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import Utils from '../../../utils/utils';
import { AvatarsService } from './avatars.service';

export interface DialogData {
  code: string;
}

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.less'],
})
export class AvatarsComponent implements OnInit {
  Utils = Utils;
  avatars;

  constructor(
    private avatarsService: AvatarsService,
    public dialogRef: MatDialogRef<AvatarsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.avatars = avatarsService.getAvatars();
  }

  selectAvatar(code) {
    this.data.code = code;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
