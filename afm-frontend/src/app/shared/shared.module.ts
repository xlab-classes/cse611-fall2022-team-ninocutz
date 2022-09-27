import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MenubarModule } from 'primeng/menubar';
import { AfmButtonComponent } from './afm-button/afm-button.component';
import { AfmBlurBackgroundComponent } from './afm-blur-background/afm-blur-background.component';
import { AfmImageComponent } from './afm-image/afm-image.component';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { AfmImageCarouselComponent } from './afm-image-carousel/afm-image-carousel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LoadingComponent } from './loading/loading.component';
import { FileUploadModule } from 'primeng/fileupload';
import { SigninComponent } from './signin/signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    FooterComponent,
    AfmButtonComponent,
    AfmBlurBackgroundComponent,
    AfmImageComponent,
    AfmImageCarouselComponent,
    LoadingComponent,
    SigninComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    MenubarModule,
    ButtonModule,
    ImageModule,
    CarouselModule,
    FontAwesomeModule,
    ProgressSpinnerModule,
    CalendarModule,
    InputTextareaModule,
    FileUploadModule,
  ],
  exports: [
    FooterComponent,
    FormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    MenubarModule,
    CarouselModule,
    FontAwesomeModule,
    ProgressSpinnerModule,
    CalendarModule,
    InputTextareaModule,
    FileUploadModule,
    ImageModule,
    AfmButtonComponent,
    AfmBlurBackgroundComponent,
    AfmImageComponent,
    AfmImageCarouselComponent,
    LoadingComponent,
    SigninComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
})
export class SharedModule {}
