import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerComponent } from './customer.component';
import { RequestRvComponent } from './request-rv/request-rv.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CustomerAppointmentComponent } from './customer-appointment/customer-appointment.component';

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
        path: 'request-rv',
        component: RequestRvComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: 'appointment-request',
        component: CustomerAppointmentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
