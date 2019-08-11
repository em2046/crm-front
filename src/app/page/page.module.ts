import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { UserListComponent } from './user/user-list/user-list.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { PermissionListComponent } from './permission/permission-list/permission-list.component';

@NgModule({
  declarations: [UserListComponent, RoleListComponent, PermissionListComponent],
  entryComponents: [
    UserListComponent,
    RoleListComponent,
    PermissionListComponent,
  ],
  imports: [CommonModule, MaterialModule],
})
export class PageModule {}
