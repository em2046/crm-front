import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FooterComponent } from './footer/footer.component';
import { FrameComponent } from './frame/frame.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { PaneDirective } from './pane/pane.directive';
import { PaneComponent } from './pane/pane.component';
import { AlertComponent } from './alert/alert.component';
import { ChipsAutocompleteComponent } from './chips-autocomplete/chips-autocomplete.component';

@NgModule({
  declarations: [
    FrameComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    PaneDirective,
    PaneComponent,
    AlertComponent,
    ChipsAutocompleteComponent,
  ],
  entryComponents: [AlertComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [HeaderComponent, FooterComponent, MenuComponent],
})
export class CoreModule {}
