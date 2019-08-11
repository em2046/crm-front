import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../alert.service';
import { User } from '../../../dto/user.model';
import { UserService } from '../user.service';
import Utils from '../../../../utils/utils';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
})
export class UserListComponent implements OnInit {
  Utils = Utils;
  users: User[];
  displayedColumns: string[] = ['avatar', 'name', 'realName', 'email'];

  constructor(
    private userService: UserService,
    public alertService: AlertService,
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService
      .getUsers(error => {
        this.alertService.alert(error.message);
      })
      .subscribe(res => {
        this.users = res;
      });
  }
}
