import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';

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
      component:CreatecouponComponent
      },
      {
      path: 'getcoupon',
      component: GetcouponComponent
      },
      {
      path: 'getcompany',
      component: GetcompanyComponent
      },
      {
      path: 'getallcoupons',
      component:GetallcouponsComponent
      }
    ])
  ],

  providers: [CompanyService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }