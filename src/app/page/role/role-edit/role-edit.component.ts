import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AlertService } from '../../../common/alert.service';
import { RoleService } from '../role.service';
import {
  ChipsAutocompleteComponent,
  Option,
} from '../../../core/chips-autocomplete/chips-autocomplete.component';
import { Role } from '../../../dto/role.model';
import { PageComponent } from '../../page.component';
import { PermissionService } from '../../permission/permission.service';
import Utils from 'src/utils/utils';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['../../edit.less', './role-edit.component.less'],
})
export class RoleEditComponent implements OnInit, PageComponent {
  @ViewChild('chipsAuto', { static: false })
  chipsAuto: ChipsAutocompleteComponent;

  constructor(
    public roleService: RoleService,
    public permissionService: PermissionService,
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
      title: ['', [Validators.minLength(1), Validators.maxLength(64)]],
    });
  }

  get name() {
    return this.editForm.get('name');
  }

  get title() {
    return this.editForm.get('title');
  }

  private roleDefaultValue: Role = { name: '', title: '' };

  Utils = Utils;
  data: {
    type: string;
    role: Role;
  };
  isEdit = false;
  role: Role = { name: '' };
  editForm;

  selectedPermissions: Option[] = [];
  allPermissions: Option[] = [];

  saveLoading = false;

  ngOnInit() {
    this.isEdit = this.data.type === 'EDIT';
    this.getPermissions();
    if (this.isEdit) {
      this.getRole(this.data.role.uuid);
    }
  }

  getPermissions() {
    this.permissionService.getPermissions().subscribe(res => {
      this.allPermissions = res.map(r => {
        return {
          value: r.uuid,
          title: r.title,
        };
      });
      this.chipsAuto.refreshFilter();
    });
  }

  getRole(uuid) {
    this.roleService.getJoinPermissions(uuid).subscribe(res => {
      this.roleDefaultValue = res;

      this.role = res;
      this.selectedPermissions = res.permissions.map(r => {
        return {
          value: r.uuid,
          title: r.title,
        };
      });
      this.name.setValue(res.name);
      this.title.setValue(res.title);
    });
  }

  onSubmit(roleData: Role) {
    if (!this.editForm.valid || this.saveLoading) {
      return;
    }
    roleData.permissions = this.selectedPermissions.map(permissions => {
      return {
        uuid: permissions.value,
      };
    });

    const role = this.data.role;

    this.saveLoading = true;

    if (this.isEdit) {
      this.saveEdit(role, {
        name: roleData.name,
        title: roleData.title,
        permissions: roleData.permissions,
      });
    } else {
      this.saveNew(roleData);
    }
  }

  private saveNew(roleData: Role) {
    this.roleService
      .create(roleData)
      .pipe(
        finalize(() => {
          this.saveLoading = false;
        }),
      )
      .subscribe(() => {
        this.alertService.snack('保存成功');
      });
  }

  private saveEdit(role, roleData: Role) {
    this.roleService
      .update(role.uuid, roleData)
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
    this.title.setValue('');
    this.selectedPermissions = [];
  }

  private resetEdit() {
    const roleDefaultValue = this.roleDefaultValue;
    this.name.setValue(roleDefaultValue.name);
    this.title.setValue(roleDefaultValue.title);
    this.selectedPermissions = roleDefaultValue.permissions
      .map(r => {
        return {
          value: r.uuid,
          title: r.title,
        };
      })
      .slice();
  }
}
