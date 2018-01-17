import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AuthGuardService } from './services/auth-guard.service';
import { CompanyService } from './services/company.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CreatecouponComponent } from './components/createcoupon/createcoupon.component';
import { GetcouponComponent } from './components/getcoupon/getcoupon.component';
import { GetcompanyComponent } from './components/getcompany/getcompany.component';
import { GetallcouponsComponent } from './components/getallcoupons/getallcoupons.component';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    CreatecouponComponent,
    GetcouponComponent,
    GetcompanyComponent,
    GetallcouponsComponent,
    HeaderComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
      path: 'createcoupon',
      component:CreatecouponComponent,
      canActivate:[AuthGuardService]
      },
      {
      path: 'getcoupon',
      component: GetcouponComponent,
      canActivate:[AuthGuardService]
      },
      {
      path: 'getcompany',
      component: GetcompanyComponent,
      canActivate:[AuthGuardService]
      },
      {
      path: 'getallcoupons',
      component:GetallcouponsComponent,
      canActivate:[AuthGuardService]
      }
    ])
  ],

  providers: [CompanyService, {provide: LocationStrategy, useClass: HashLocationStrategy}, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }