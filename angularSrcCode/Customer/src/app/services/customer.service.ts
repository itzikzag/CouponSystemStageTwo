import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon';
import { CouponType } from '../models/coupontype';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CustomerService {

  constructor(private _http: Http) { }

  private urlRel = "./";

  errorHandler(error: Response){
    return Observable.throw(error);
  }

  purchaseCoupon(c: Coupon) {
    let url = this.urlRel + 'purchasecoupon';
    return this._http.post(url, c)
    .catch(this.errorHandler);
  }

  getAllPurchasedCoupons() {
    let url = this.urlRel + 'getallpurchasedcoupons';
    return this._http.get(url)
      .map(response => response.json())
      .catch(this.errorHandler);
  }

  getAllPurchasedCouponsByType(type: CouponType) {
    let url = this.urlRel + 'getallpurchasedcouponsbytype/' + type;
    return this._http.get(url)
      .map(response => response.json())
      .catch(this.errorHandler);
  }

  getAllPurchasedCouponsByPrice(price: number) {
    let url = this.urlRel + 'getallpurchasedcouponsbyprice/' + price;
    return this._http.get(url)
      .map(response => response.json())
      .catch(this.errorHandler);
  }

  viewAllCoupons() {
    let url = this.urlRel + 'viewallcoupons';
    return this._http.get(url)
    .map(response => response.json())
    .catch(this.errorHandler);
  }

  getCustomer() {
    let url = this.urlRel + 'getcustomer/';
    return this._http.get(url)
    .map(response => response.json())
    .catch(this.errorHandler);
  }
}




