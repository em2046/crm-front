import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AlertService } from '../../../common/service/alert.service';
import { User } from '../../../common/dto/user.model';
import { PageData } from '../../../common/class/page-data';
import { RoleService } from '../../../common/service/role.service';
import { UserService } from '../../../common/service/user.service';

import {
  ChipsAutocompleteComponent,
  Option,
} from '../../../components/chips-autocomplete/chips-autocomplete.component';
import { PageEdit } from '../../page-edit';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['../../edit.less', './user-edit.component.less'],
})
export class UserEditComponent extends PageEdit<User>
  implements OnInit, PageData {
  @ViewChild('chipsAuto', { static: false })
  chipsAuto: ChipsAutocompleteComponent;

  constructor(
    public roleService: RoleService,
    public service: UserService,
    private formBuilder: FormBuilder,
    public alertService: AlertService,
  ) {
    super();
    this.editForm = this.formBuilder.group({
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
          this.passwordValidator(),
          Validators.minLength(4),
          Validators.maxLength(200),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.maxLength(512), Validators.email],
      ],
      realName: ['', [Validators.minLength(0), Validators.maxLength(64)]],
    });
  }

  get name() {
    return this.editForm.get('name');
  }

  get password() {
    return this.editForm.get('password');
  }

  get email() {
    return this.editForm.get('email');
  }

  get realName() {
    return this.editForm.get('realName');
  }

  private userDefaultValue: User = { name: '', email: '', realName: '' };

  data: {
    type: string;
    user: User;
  };

  user: User = { name: '' };

  selectedRoles: Option[] = [];
  allRoles: Option[] = [];

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isEdit = this.isEdit;
      if (isEdit) {
        return null;
      }
      if (control.value !== '') {
        return null;
      }
      return { required: { value: control.value } };
    };
  }

  ngOnInit() {
    this.isEdit = this.data.type === 'EDIT';
    this.getRoles();
    if (this.isEdit) {
      this.getUser(this.data.user.uuid);
    }
  }

  getUser(uuid) {
    this.service.getOne(uuid).subscribe(res => {
      this.userDefaultValue = res;

      this.user = res;
      this.selectedRoles = res.roles.map(r => {
        return {
          value: r.uuid,
          title: r.title,
        };
      });
      this.name.setValue(res.name);
      this.email.setValue(res.email);
      this.realName.setValue(res.realName);
    });
  }

  getRoles() {
    this.roleService.getAll().subscribe(res => {
      this.allRoles = res.map(r => {
        return {
          value: r.uuid,
          title: r.title,
        };
      });
      this.chipsAuto.refreshFilter();
    });
  }

  onSubmit(userData: User) {
    if (!this.editForm.valid || this.saveLoading) {
      return;
    }
    userData.roles = this.selectedRoles.map(role => {
      return {
        uuid: role.value,
      };
    });

    const user = this.data.user;

    this.saveLoading = true;

    if (this.isEdit) {
      userData.password = null;
      this.saveEdit(user, {
        name: userData.name,
        email: userData.email,
        realName: userData.realName,
        roles: userData.roles,
      });
    } else {
      this.saveNew(userData);
    }
  }

  resetNew() {
    this.name.setValue('');
    this.password.setValue('');
    this.email.setValue('');
    this.realName.setValue('');
    this.selectedRoles = [];
  }

  resetEdit() {
    const userDefaultValue = this.userDefaultValue;
    this.name.setValue(userDefaultValue.name);
    this.email.setValue(userDefaultValue.email);
    this.realName.setValue(userDefaultValue.realName);
    this.selectedRoles = userDefaultValue.roles
      .map(r => {
        return {
          value: r.uuid,
          title: r.title,
        };
      })
      .slice();
  }
}
