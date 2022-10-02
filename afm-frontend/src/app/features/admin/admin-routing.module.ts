import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CurrentEventComponent } from './current-event/current-event.component';
import { FutureEventsComponent } from './future-events/future-events.component';
import { PastEventsComponent } from './past-events/past-events.component';
import { GalleryComponent } from './gallery/gallery.component';
import { BookingsComponent } from './bookings/bookings.component';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin.component';
import { AddFutureEventComponent } from './add-future-event/add-future-event.component';
import { AuthGuardService } from 'src/app/core/auth/auth-gaurd.service';
import { EditFutureEventComponent } from './edit-future-event/edit-future-event.component';
import { AddPastEventComponent } from './add-past-event/add-past-event.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: '/admin/home',
        pathMatch: 'full',
        canActivateChild: [AuthGuardService],
      },
      {
        path: 'admin/home',
        component: AdminHomeComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path: 'admin/current-event',
        component: CurrentEventComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path: 'admin/future-events',
        component: FutureEventsComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path: 'admin/add-future-event',
        component: AddFutureEventComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path: 'admin/edit-future-event',
        component: EditFutureEventComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path: 'admin/past-events',
        component: PastEventsComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path: 'admin/add-past-event',
        component: AddPastEventComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path: 'admin/gallery',
        component: GalleryComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path: 'admin/bookings',
        component: BookingsComponent,
        canActivateChild: [AuthGuardService],
      },
      {
        path: 'admin/users',
        component: UsersComponent,
        canActivateChild: [AuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
