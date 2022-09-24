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

@NgModule({
  declarations: [
    FooterComponent,
    AfmButtonComponent,
    AfmBlurBackgroundComponent,
    AfmImageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    MenubarModule,
    ButtonModule,
    ImageModule,
  ],
  exports: [
    FooterComponent,
    FormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    MenubarModule,
    AfmButtonComponent,
    AfmBlurBackgroundComponent,
    AfmImageComponent,
  ],
})
export class SharedModule {}
