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
import { ComplaintEditComponent } from './complaint/edit/complaint-edit.component';
import { ComplaintViewComponent } from './complaint/view/complaint-view.component';
import { LabelEditComponent } from './label/edit/label-edit.component';
import { QueryGroupComponent } from './label/query-group/query-group.component';
import { LabelListComponent } from './label/list/label-list.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SaleListComponent } from './sale/list/sale-list.component';
import { SaleEditComponent } from './sale/edit/sale-edit.component';
import { SaleViewComponent } from './sale/view/sale-view.component';
import { CustomerViewComponent } from './customer/view/customer-view.component';

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
    ComplaintViewComponent,
    LabelEditComponent,
    QueryGroupComponent,
    LabelListComponent,
    StatisticsComponent,
    SaleListComponent,
    SaleEditComponent,
    SaleViewComponent,
    CustomerViewComponent,
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
    ComplaintViewComponent,
    LabelEditComponent,
    LabelListComponent,
    StatisticsComponent,
    SaleListComponent,
    SaleEditComponent,
    SaleViewComponent,
    CustomerViewComponent,
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
