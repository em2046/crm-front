import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [MatSidenavModule, MatButtonModule, MatToolbarModule, MatIconModule],
  exports: [MatSidenavModule, MatButtonModule, MatToolbarModule, MatIconModule],
})
export class MaterialModule {}
