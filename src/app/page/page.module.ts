import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { UserListComponent } from './user/user-list/user-list.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { PermissionListComponent } from './permission/permission-list/permission-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

@NgModule({
  declarations: [
    UserListComponent,
    RoleListComponent,
    PermissionListComponent,
    UserEditComponent,
  ],
  entryComponents: [
    UserListComponent,
    RoleListComponent,
    PermissionListComponent,
    UserEditComponent,
  ],
  imports: [CommonModule, MaterialModule],
})
export class PageModule {}
