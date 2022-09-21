import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, FormsModule, InputTextModule],
  exports: [FooterComponent, FormsModule, InputTextModule, ButtonModule],
})
export class SharedModule {}
