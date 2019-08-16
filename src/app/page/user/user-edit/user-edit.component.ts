import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../common/alert.service';
import { Role } from '../../../dto/role.model';
import { User } from '../../../dto/user.model';
import { PageComponent } from '../../page.component';
import { RoleService } from '../../role/role.service';
import { UserService } from '../../../common/user.service';
import Utils from 'src/utils/utils';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { finalize, map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['../../edit.less', './user-edit.component.less'],
})
export class UserEditComponent implements OnInit, PageComponent {
  private userDefaultValue: User = { name: '', email: '', realName: '' };

  constructor(
    public roleService: RoleService,
    public userService: UserService,
    private formBuilder: FormBuilder,
    private readonly alertService: AlertService,
  ) {
    this.initFilter();

    this.editForm = this.formBuilder.group({
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
      realName: ['', [Validators.minLength(0), Validators.maxLength(64)]],
    });
  }

  get name() {
    return this.editForm.get('name');
  }

  get email() {
    return this.editForm.get('email');
  }

  get realName() {
    return this.editForm.get('realName');
  }

  Utils = Utils;
  data: User;
  user: User;
  editForm;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  rolesCtrl = new FormControl();
  filteredRoles: Observable<Role[]>;
  selectedRoles: Role[] = [];
  allRoles: Role[] = [];

  saveLoading = false;

  @ViewChild('roleInput', { static: false })
  roleInput: ElementRef<HTMLInputElement>;

  @ViewChild('auto', { static: false })
  matAutocomplete: MatAutocomplete;

  private initFilter() {
    this.refreshFilter();
  }

  private refreshFilter() {
    this.filteredRoles = this.rolesCtrl.valueChanges.pipe(
      startWith(null),
      map((value: Role | string | null) => {
        if (value) {
          if (typeof value === 'string') {
            return this._filter(value);
          } else if (value.title) {
            return this._filter(value.title);
          }
        } else {
          return this.allRoles.slice();
        }
      }),
    );
  }

  add(event: MatChipInputEvent): void {
    // Add role only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our role
      if ((value || '').trim()) {
        const role = this.find(value);
        if (role) {
          this.selectedRoles.push(role);
        }
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.rolesCtrl.setValue(null);
    }
  }

  remove(role: Role): void {
    const index = this.selectedRoles.indexOf(role);

    if (index >= 0) {
      this.selectedRoles.splice(index, 1);
    }
  }

  find(title: string): Role {
    return this.allRoles.find(role => {
      return role.title === title.trim();
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const role = this.find(event.option.viewValue);
    const alreadySelected = this.selectedRoles.find(selected => {
      return selected.name === role.name;
    });
    if (!alreadySelected) {
      this.selectedRoles.push(role);
    }
    this.roleInput.nativeElement.value = '';
    this.rolesCtrl.setValue(null);
  }

  private _filter(title: string): Role[] {
    const filterValue = title.toLowerCase();

    return this.allRoles.filter(r => {
      const foundTitle = r.title.toLowerCase().indexOf(filterValue) === 0;
      const foundName = r.name.toLowerCase().indexOf(filterValue) === 0;
      return foundTitle || foundName;
    });
  }

  ngOnInit() {
    this.getRoles();
    this.getUser(this.data.uuid);
  }

  getUser(uuid) {
    this.userService.getUser(uuid).subscribe(res => {
      this.userDefaultValue = res;

      this.user = res;
      this.selectedRoles = res.roles;
      this.name.setValue(res.name);
      this.email.setValue(res.email);
      this.realName.setValue(res.realName);
    });
  }

  getRoles() {
    this.roleService.getRoles().subscribe(res => {
      this.allRoles = res;
      this.refreshFilter();
    });
  }

  onSubmit(userData: User) {
    if (!this.editForm.valid || this.saveLoading) {
      return;
    }
    userData.roles = this.selectedRoles;

    this.saveLoading = true;
    this.userService
      .updateUser(this.data.uuid, userData)
      .pipe(
        finalize(() => {
          this.saveLoading = false;
        }),
      )
      .subscribe(() => {
        this.alertService.alert('保存成功');
      });
  }

  resetForm() {
    const userDefaultValue = this.userDefaultValue;
    this.selectedRoles = userDefaultValue.roles.slice();
    this.name.setValue(userDefaultValue.name);
    this.email.setValue(userDefaultValue.email);
    this.realName.setValue(userDefaultValue.realName);
  }
}
