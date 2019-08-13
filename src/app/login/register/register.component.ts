import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import Utils from '../../../utils/utils';
import { User } from '../../dto/user.model';
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
    private readonly router: Router,
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

    this.loginService
      .addUser(newUser)
      .subscribe(() => {
        this.alertService.alert('注册成功');
        this.router.navigate(['/login']);
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
}
