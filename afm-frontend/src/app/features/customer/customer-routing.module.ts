import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerComponent } from './customer.component';
import { CustomerFutureEventsComponent } from './customer-future-events/customer-future-events.component';
import { CustomerPastEventsComponent } from './customer-past-events/customer-past-events.component';
import { RequestRvComponent } from './request-rv/request-rv.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: CustomerHomeComponent,
      },
      {
        path: 'future-events',
        component: CustomerFutureEventsComponent,
      },
      {
        path: 'past-events',
        component: CustomerPastEventsComponent,
      },
      {
        path: 'request-rv',
        component: RequestRvComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
