import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import Utils from 'src/utils/utils';
import { AlertService } from '../../common/alert.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../login.less', './login.component.less'],
})
export class LoginComponent implements OnInit {
  Utils = Utils;
  loginForm;
  loginLoading = false;

  constructor(
    private readonly router: Router,
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

  get name() {
    return this.loginForm.get('name');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(userData) {
    if (!this.loginForm.valid || this.loginLoading === true) {
      return;
    }

    const loginUser = {
      username: userData.name,
      password: userData.password,
    };

    this.loginLoading = true;
    this.loginService
      .loginUser(loginUser)
      .pipe(
        finalize(() => {
          this.loginLoading = false;
        }),
      )
      .subscribe(res => {
        this.alertService.alert('登录成功');
        sessionStorage.setItem('access_token', res.access_token);
        this.router.navigate(['/']);
      });
  }

  ngOnInit() {
    sessionStorage.removeItem('access_token');
  }

  handleForgetPassword() {
    this.alertService.alert('请与管理员联系');
  }
}
