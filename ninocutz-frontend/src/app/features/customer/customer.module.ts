import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CustomerHomeComponent],
  imports: [CustomerRoutingModule, CommonModule, SharedModule],
})
export class CustomerModule {}
