import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

import { AlertComponent } from './alert/alert.component';
import { ChipsAutocompleteComponent } from './chips-autocomplete/chips-autocomplete.component';

@NgModule({
  declarations: [AlertComponent, ChipsAutocompleteComponent],
  entryComponents: [AlertComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [ChipsAutocompleteComponent],
})
export class ComponentsModule {}
