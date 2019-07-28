import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatListModule,
  MatExpansionModule,
  MatDialogModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
  ],
  exports: [
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
  ],
})
export class MaterialModule {}
