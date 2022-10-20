import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerComponent } from './customer.component';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { RequestRvComponent } from './request-rv/request-rv.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CurrentLocationComponent } from './current-location/current-location.component';
import { CustomerPastEventComponent } from './customer-past-event/customer-past-event.component';
import { CustomerFutureEventComponent } from './customer-future-event/customer-future-event.component';

@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerComponent,
    CustomerHeaderComponent,
    RequestRvComponent,
    SignUpComponent,
    CurrentLocationComponent,
    CustomerPastEventComponent,
    CustomerFutureEventComponent,
  ],
  imports: [CustomerRoutingModule, CommonModule, SharedModule],
})
export class CustomerModule {}
