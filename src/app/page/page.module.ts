import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../material.module';
import { UserListComponent } from './user/list/user-list.component';
import { RoleListComponent } from './role/list/role-list.component';
import { PermissionListComponent } from './permission/list/permission-list.component';
import { UserEditComponent } from './user/edit/user-edit.component';
import { RoleEditComponent } from './role/edit/role-edit.component';
import { ComplaintModule } from './complaint/complaint.module';
import { CustomerListComponent } from './customer/list/customer-list.component';
import { CustomerEditComponent } from './customer/edit/customer-edit.component';
import { KnowledgeListComponent } from './knowledge/list/knowledge-list.component';
import { KnowledgeEditComponent } from './knowledge/edit/knowledge-edit.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    UserListComponent,
    RoleListComponent,
    PermissionListComponent,
    UserEditComponent,
    RoleEditComponent,
    CustomerListComponent,
    CustomerEditComponent,
    KnowledgeListComponent,
    KnowledgeEditComponent,
  ],
  entryComponents: [
    UserListComponent,
    RoleListComponent,
    PermissionListComponent,
    CustomerListComponent,
    UserEditComponent,
    RoleEditComponent,
    CustomerEditComponent,
    KnowledgeListComponent,
    KnowledgeEditComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    ComplaintModule,
    CKEditorModule,
  ],
})
export class PageModule {}
