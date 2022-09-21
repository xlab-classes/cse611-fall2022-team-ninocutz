import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [CustomerHomeComponent, HeaderComponent],
  imports: [CustomerRoutingModule, CommonModule, SharedModule],
})
export class CustomerModule {}
