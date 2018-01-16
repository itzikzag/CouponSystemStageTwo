import { CustomerService } from './../../services/customer.service';
import { Coupon } from './../../models/coupon';
import { Component, OnInit } from '@angular/core';
import { CouponType } from './../../models/CouponType';

@Component({
  selector: 'app-getallpurchasedcoupons',
  templateUrl: './getallpurchasedcoupons.component.html',
  styleUrls: ['./getallpurchasedcoupons.component.css']
})
export class GetallpurchasedcouponsComponent implements OnInit {

  public coupons: Coupon[];
  public coupon: Coupon = new Coupon();
  public type: CouponType;
  public price: number;

  constructor(private servicer: CustomerService) { }

  ngOnInit() {
    var self = this;
    this.coupons = new Array();
    self.servicer.getAllPurchasedCoupons().subscribe(
      (coupons)=>{
          for (let c of coupons) {
          c = new Coupon(c);
          self.coupons.push(c);
        }
      }
    );
  }

  clickPurchase() {
    this.servicer.purchaseCoupon(this.coupon).subscribe
      (
      function (response) { }
      );
  }

  clickPrice() {
    var self = this;
    this.coupons = new Array();
    self.servicer.getAllPurchasedCouponsByPrice(self.price).subscribe(
      (coupons)=>{
        for (let c of coupons) {
          c = new Coupon(c);
          self.coupons.push(c);
        }
      }
    );
  }

  clickType() {
    var self = this;
    this.coupons = new Array();
    self.servicer.getAllPurchasedCouponsByType(self.type).subscribe(
      (coupons)=>{
        for (let c of coupons) {
          c = new Coupon(c);
          self.coupons.push(c);
        }
      }
    );
  }
}
