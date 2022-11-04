import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './features/admin/admin.module';
import { CustomerModule } from './features/customer/customer.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './core/auth/auth-gaurd.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import {
  FacebookLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminModule,
    CustomerModule,
    SharedModule,
    HttpClientModule,
    SocialLoginModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1164434450813223'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    JwtHelperService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
