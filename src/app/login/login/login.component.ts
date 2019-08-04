import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Utils from 'src/utils/utils';
import { AlertService } from '../../alert.service';
import { User } from '../../dto/user.model';
import { LoginService, UserLoginCode } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../login.less', './login.component.less'],
})
export class LoginComponent implements OnInit {
  Utils = Utils;
  loginForm;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    public alertService: AlertService,
  ) {
    this.loginForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(200),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(200),
        ],
      ],
    });
  }

  onSubmit(userData) {
    if (!this.loginForm.valid) {
      return;
    }

    const loginUser: User = {
      name: userData.name,
      password: userData.password,
    };

    this.loginService.loginUser(loginUser).subscribe(res => {
      switch (res.code) {
        case UserLoginCode.SUCCESS:
          this.alertService.alert('登录成功');
          break;
        case UserLoginCode.NAME_OR_PASSWORD_INCORRECT:
          this.alertService.alert('用户名或密码错误');
      }
    });
  }

  get name() {
    return this.loginForm.get('name');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
  }
}
