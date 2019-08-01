import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import Utils from '../../../utils/utils';
import { User } from '../../domain/user.model';
import { AvatarsComponent } from '../avatars/avatars.component';
import { LoginService } from '../login.service';

const verifyPasswordValidator: ValidatorFn = (
  control: FormGroup,
): ValidationErrors | null => {
  const password = control.get('password');
  const verifyPassword = control.get('verifyPassword');
  return password && verifyPassword && password.value !== verifyPassword.value
    ? { verifyPassword: true }
    : null;
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login.less', './register.component.less'],
})
export class RegisterComponent implements OnInit {
  Utils = Utils;
  avatar: number;
  registerForm;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    public snackBar: MatSnackBar,
  ) {
    this.registerForm = this.formBuilder.group(
      {
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
      },
      {
        validators: verifyPasswordValidator,
      },
    );
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

    const avatar = (this.avatar && this.avatar.toString()) || '';
    const newUser: User = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      avatar,
    };

    this.loginService.addUser(newUser).subscribe(() => {
      this.snackBar.open('注册成功');
    });
  }

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AvatarsComponent, {
      width: '75vw',
      minWidth: '400px',
      data: { code: this.avatar },
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
