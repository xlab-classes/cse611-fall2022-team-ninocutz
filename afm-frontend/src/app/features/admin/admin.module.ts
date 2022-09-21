import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SigninComponent } from './signin/signin.component';
@NgModule({
  declarations: [AdminHomeComponent, SigninComponent],
  imports: [AdminRoutingModule, CommonModule, SharedModule],
})
export class AdminModule {}
