import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SigninComponent } from './signin/signin.component';
import { CurrentEventComponent } from './current-event/current-event.component';
import { FutureEventsComponent } from './future-events/future-events.component';
import { PastEventsComponent } from './past-events/past-events.component';
import { GalleryComponent } from './gallery/gallery.component';
import { BookingsComponent } from './bookings/bookings.component';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
      {
        path: 'admin/signin',
        component: SigninComponent,
      },
      {
        path: 'admin/forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'admin/reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'admin/home',
        component: AdminHomeComponent,
      },
      {
        path: 'admin/current-event',
        component: CurrentEventComponent,
      },
      {
        path: 'admin/future-events',
        component: FutureEventsComponent,
      },
      {
        path: 'admin/past-events',
        component: PastEventsComponent,
      },
      {
        path: 'admin/gallery',
        component: GalleryComponent,
      },
      {
        path: 'admin/bookings',
        component: BookingsComponent,
      },
      {
        path: 'admin/users',
        component: UsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
