import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SigninComponent } from './signin/signin.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { CurrentEventComponent } from './current-event/current-event.component';
import { FutureEventsComponent } from './future-events/future-events.component';
import { PastEventsComponent } from './past-events/past-events.component';
import { GalleryComponent } from './gallery/gallery.component';
import { BookingsComponent } from './bookings/bookings.component';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddFutureEventComponent } from './add-future-event/add-future-event.component';
@NgModule({
  declarations: [
    AdminHomeComponent,
    SigninComponent,
    AdminHeaderComponent,
    CurrentEventComponent,
    FutureEventsComponent,
    PastEventsComponent,
    GalleryComponent,
    BookingsComponent,
    UsersComponent,
    AdminComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AddFutureEventComponent,
  ],
  imports: [AdminRoutingModule, CommonModule, SharedModule],
})
export class AdminModule {}
