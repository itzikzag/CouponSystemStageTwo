import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

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
        component: PurchasecouponComponent
      },
      {
        path: 'getallpurchasedcoupons',
        component: GetallpurchasedcouponsComponent
      }
    ])
  ],
  providers: [CustomerService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
