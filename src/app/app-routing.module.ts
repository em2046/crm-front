import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EverythingComponent } from './framework/everything/everything.component';

const routes: Routes = [
  {
    path: '',
    component: EverythingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
