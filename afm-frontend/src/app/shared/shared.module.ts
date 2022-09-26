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

@NgModule({
  declarations: [
    FooterComponent,
    AfmButtonComponent,
    AfmBlurBackgroundComponent,
    AfmImageComponent,
    AfmImageCarouselComponent,
    LoadingComponent,
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
    AfmButtonComponent,
    AfmBlurBackgroundComponent,
    AfmImageComponent,
    AfmImageCarouselComponent,
    LoadingComponent,
  ],
})
export class SharedModule {}
