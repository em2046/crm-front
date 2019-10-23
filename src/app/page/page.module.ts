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
import { CustomerListComponent } from './customer/list/customer-list.component';
import { CustomerEditComponent } from './customer/edit/customer-edit.component';
import { KnowledgeListComponent } from './knowledge/list/knowledge-list.component';
import { KnowledgeEditComponent } from './knowledge/edit/knowledge-edit.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { KnowledgeSearchComponent } from './knowledge/search/knowledge-search.component';
import { KnowledgeViewComponent } from './knowledge/view/knowledge-view.component';
import { ComplaintListComponent } from './complaint/list/complaint-list.component';
import { ComplaintEditComponent } from './complaint/complaint-edit/complaint-edit.component';

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
    KnowledgeSearchComponent,
    KnowledgeViewComponent,
    ComplaintListComponent,
    ComplaintEditComponent,
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
    KnowledgeSearchComponent,
    KnowledgeViewComponent,
    ComplaintListComponent,
    ComplaintEditComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    CKEditorModule,
  ],
})
export class PageModule {}
