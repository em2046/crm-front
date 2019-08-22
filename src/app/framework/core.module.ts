import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FooterComponent } from './footer/footer.component';
import { EverythingComponent } from './everything/everything.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { PaneDirective } from './pane/pane.directive';
import { PaneComponent } from './pane/pane.component';

@NgModule({
  declarations: [
    EverythingComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    PaneDirective,
    PaneComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [HeaderComponent, FooterComponent, MenuComponent],
})
export class CoreModule {}
