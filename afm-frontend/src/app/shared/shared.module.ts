import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    MenubarModule,
  ],
  exports: [
    FooterComponent,
    FormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    MenubarModule,
  ],
})
export class SharedModule {}
