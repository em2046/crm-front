import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material';
import Utils from '../../../utils/utils';
import { User } from '../../dto/user.model';
import { AvatarsComponent } from '../avatars/avatars.component';
import { LoginService, UserCreateCode } from '../login.service';
import { AlertService } from 'src/app/alert.service';

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
    public alertService: AlertService,
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

    this.loginService.addUser(newUser).subscribe(res => {
      switch (res.code) {
        case UserCreateCode.SUCCESS:
          this.alertService.alert('注册成功');
          break;
        case UserCreateCode.NAME_ALREADY_EXISTS:
          this.alertService.alert('用户名已经存在');
          break;
        case UserCreateCode.EMAIL_ALREADY_EXISTS:
          this.alertService.alert('邮箱地址已经存在');
          break;
      }
    });
  }

  ngOnInit() {
  }

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


}
