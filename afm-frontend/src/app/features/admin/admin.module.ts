import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { CurrentEventComponent } from './current-event/current-event.component';
import { FutureEventsComponent } from './future-events/future-events.component';
import { PastEventsComponent } from './past-events/past-events.component';
import { GalleryComponent } from './gallery/gallery.component';
import { BookingsComponent } from './bookings/bookings.component';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin.component';
import { AddFutureEventComponent } from './add-future-event/add-future-event.component';
import { AuthGuardService } from 'src/app/core/auth/auth-gaurd.service';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import { EditFutureEventComponent } from './edit-future-event/edit-future-event.component';
import { AddPastEventComponent } from './add-past-event/add-past-event.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminHeaderComponent,
    CurrentEventComponent,
    FutureEventsComponent,
    PastEventsComponent,
    GalleryComponent,
    BookingsComponent,
    UsersComponent,
    AdminComponent,
    AddFutureEventComponent,
    EditFutureEventComponent,
    AddPastEventComponent,
    NotificationsComponent,
  ],
  imports: [AdminRoutingModule, CommonModule, SharedModule],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    AuthGuardService,
  ],
})
export class AdminModule {}
