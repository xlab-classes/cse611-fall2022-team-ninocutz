import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerComponent } from './customer.component';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { CustomerFutureEventsComponent } from './customer-future-events/customer-future-events.component';
import { CustomerPastEventsComponent } from './customer-past-events/customer-past-events.component';
import { RequestRvComponent } from './request-rv/request-rv.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerComponent,
    CustomerHeaderComponent,
    CustomerFutureEventsComponent,
    CustomerPastEventsComponent,
    RequestRvComponent,
    SignUpComponent,
  ],
  imports: [CustomerRoutingModule, CommonModule, SharedModule],
})
export class CustomerModule {}
