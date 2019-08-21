import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AlertService } from '../../../common/alert.service';
import { User } from '../../../dto/user.model';
import { PageComponent } from '../../page.component';
import { RoleService } from '../../role/role.service';
import { UserService } from '../../../common/user.service';
import Utils from 'src/utils/utils';
import { finalize } from 'rxjs/operators';

import {
  ChipsAutocompleteComponent,
  Option,
} from '../../../core/chips-autocomplete/chips-autocomplete.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['../../edit.less', './user-edit.component.less'],
})
export class UserEditComponent implements OnInit, PageComponent {
  @ViewChild('chipsAuto', { static: false })
  chipsAuto: ChipsAutocompleteComponent;

  constructor(
    public roleService: RoleService,
    public userService: UserService,
    private formBuilder: FormBuilder,
    private readonly alertService: AlertService,
  ) {
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

  Utils = Utils;
  data: {
    type: string;
    user: User;
  };
  isEdit = false;
  user: User = { name: '' };
  editForm;

  selectedRoles: Option[] = [];
  allRoles: Option[] = [];

  saveLoading = false;

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
    this.userService.getOne(uuid).subscribe(res => {
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

  private saveNew(userData: User) {
    this.userService
      .create(userData)
      .pipe(
        finalize(() => {
          this.saveLoading = false;
        }),
      )
      .subscribe(() => {
        this.alertService.snack('保存成功');
      });
  }

  private saveEdit(user, userData: User) {
    this.userService
      .update(user.uuid, userData)
      .pipe(
        finalize(() => {
          this.saveLoading = false;
        }),
      )
      .subscribe(() => {
        this.alertService.snack('保存成功');
      });
  }

  resetForm() {
    if (this.isEdit) {
      this.resetEdit();
    } else {
      this.resetNew();
    }
  }

  private resetNew() {
    this.name.setValue('');
    this.password.setValue('');
    this.email.setValue('');
    this.realName.setValue('');
    this.selectedRoles = [];
  }

  private resetEdit() {
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
