import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AuthGuardService } from './services/auth-guard.service'
import { CustomerService } from './services/customer.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GetallpurchasedcouponsComponent } from './components/getallpurchasedcoupons/getallpurchasedcoupons.component';
import { PurchasecouponComponent } from './components/purchasecoupon/purchasecoupon.component';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GetallpurchasedcouponsComponent,
    PurchasecouponComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'purchasecoupon',
        component: PurchasecouponComponent,
        canActivate:[AuthGuardService]
      },
      {
        path: 'getallpurchasedcoupons',
        component: GetallpurchasedcouponsComponent,
        canActivate:[AuthGuardService]
      }
    ])
  ],
  providers: [CustomerService, {provide: LocationStrategy, useClass: HashLocationStrategy}, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
