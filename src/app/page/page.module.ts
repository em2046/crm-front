import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../material.module';
import { UserListComponent } from './user/list/user-list.component';
import { RoleListComponent } from './role/list/role-list.component';
import { PermissionListComponent } from './permission/list/permission-list.component';
import { UserEditComponent } from './user/edit/user-edit.component';
import { RoleEditComponent } from './role/edit/role-edit.component';
import { ComplaintModule } from './complaint/complaint.module';

@NgModule({
  declarations: [
    UserListComponent,
    RoleListComponent,
    PermissionListComponent,
    UserEditComponent,
    RoleEditComponent,
  ],
  entryComponents: [
    UserListComponent,
    RoleListComponent,
    PermissionListComponent,
    UserEditComponent,
    RoleEditComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatSortModule,
    ComplaintModule,
  ],
})
export class PageModule {}
