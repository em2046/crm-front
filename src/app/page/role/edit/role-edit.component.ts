import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../common/service/alert.service';
import { RoleService } from '../../../common/service/role.service';
import {
  ChipsAutocompleteComponent,
  Option,
} from '../../../components/chips-autocomplete/chips-autocomplete.component';
import { Role } from '../../../common/model/role.model';
import { PageData } from '../../../common/class/page-data';
import { PermissionService } from '../../../common/service/permission.service';
import { PageEdit } from '../../common/page-edit';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['../../common/edit.less', './role-edit.component.less'],
})
export class RoleEditComponent extends PageEdit<Role>
  implements OnInit, PageData {
  @ViewChild('chipsAuto', { static: false })
  chipsAuto: ChipsAutocompleteComponent;

  constructor(
    public service: RoleService,
    public permissionService: PermissionService,
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

  data: {
    type: string;
    role: Role;
  };
  role: Role = { name: '' };

  selectedPermissions: Option[] = [];
  allPermissions: Option[] = [];

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
    this.service.getJoinPermissions(uuid).subscribe(res => {
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

  onSubmit(data: Role) {
    if (!this.editForm.valid || this.saveLoading) {
      return;
    }
    data.permissions = this.selectedPermissions.map(permissions => {
      return {
        uuid: permissions.value,
      };
    });

    const role = this.data.role;

    this.saveLoading = true;

    if (this.isEdit) {
      this.saveEdit(role, {
        name: data.name,
        title: data.title,
        permissions: data.permissions,
      });
    } else {
      this.saveNew(data);
    }
  }

  resetNew() {
    this.name.setValue('');
    this.title.setValue('');
    this.selectedPermissions = [];
  }

  resetEdit() {
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
