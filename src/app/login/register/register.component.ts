import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  registerForm;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(200),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.maxLength(512), Validators.email],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(200),
        ],
      ],
      verifyPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(200),
        ],
      ],
    });
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get verifyPassword() {
    return this.registerForm.get('verifyPassword');
  }

  onSubmit(userData) {
    if (!this.registerForm.valid) {
      return;
    }

    console.log(userData);
    console.log(this.avatar);
  }

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AvatarsComponent, {
      width: '75vw',
      minWidth: '400px',
      data: { animal: this.avatar },
    });

    dialogRef.afterClosed().subscribe(code => {
      this.avatar = code;
    });
  }

  getErrorMessage(field, label) {
    if (field.errors.required) {
      return `${label}必须填写`;
    }
    if (field.errors.email) {
      return `必须填写正确的邮箱地址`;
    }
    if (field.errors.minlength) {
      return `${label}不能少于${field.errors.minlength.requiredLength}个字符`;
    }
    if (field.errors.maxlength) {
      return `${label}不能多于${field.errors.maxlength.requiredLength}个字符`;
    }
    return '';
  }
}
