import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { RegisterComponent } from './register/register.component';
import { BackgroundComponent } from './background/background.component';
import { AvatarsComponent } from './avatars/avatars.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    BackgroundComponent,
    AvatarsComponent,
  ],
  entryComponents: [AvatarsComponent],
  imports: [CommonModule, LoginRoutingModule, MaterialModule, FormsModule],
})
export class LoginModule {}
