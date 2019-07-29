import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrameComponent } from './core/frame/frame.component';

const routes: Routes = [
  {
    path: '',
    component: FrameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
