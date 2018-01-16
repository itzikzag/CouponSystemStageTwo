import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { Coupon } from '../models/coupon';
import { CouponType } from '../models/coupontype';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CompanyService {

  constructor(private _http: Http) { }

  private urlRel = "./";

  errorHandler(error: Response) {
    return Observable.throw(error);
  }

  createCoupon(c: Coupon) {
    let url = this.urlRel + 'createcoupon';
    return this._http.post(url, c)
      .catch(this.errorHandler);
  }

  deleteCoupon(c: Coupon) {
    let url = this.urlRel + 'deletecoupon';
    return this._http.delete(url, { body: c })
      .catch(this.errorHandler);
  }

  updateCoupon(c: Coupon) {
    let url = this.urlRel + 'updatecoupon';
    return this._http.put(url, c)
      .catch(this.errorHandler);
  }

  getCoupon(id) {
    let url = this.urlRel + 'getcoupon/' + id;
    return this._http.get(url)
      .map(response => response.json())
      .catch(this.errorHandler);
  }

  getCompany() {
    let url = this.urlRel + 'getcompany';
    return this._http.get(url)
      .map(response => response.json())
      .catch(this.errorHandler);
  }

  getAllCoupons() {
    let url = this.urlRel + 'getallcoupons';
    return this._http.get(url)
      .map(response => response.json())
      .catch(this.errorHandler);
  }

  getCouponsByType(type: CouponType) {
    let url = this.urlRel + 'getcouponsbytype/' + type;
    return this._http.get(url)
      .map(response => response.json())
      .catch(this.errorHandler);
  }

  getCouponsByPrice(price: number) {
    let url = this.urlRel + 'getcouponsbyprice/' + price;
    return this._http.get(url)
      .map(response => response.json())
      .catch(this.errorHandler);
  }

  getCouponsByDate(date: Date) {
    let url = this.urlRel + 'getcouponsbydate/' + date;
    return this._http.get(url)
      .map(response => response.json())
      .catch(this.errorHandler);
  }

}
