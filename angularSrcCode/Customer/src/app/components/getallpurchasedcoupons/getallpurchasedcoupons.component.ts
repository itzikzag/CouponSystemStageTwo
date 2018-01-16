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
  showSpinner: boolean = true;


  constructor(private servicer: CustomerService) { }

  ngOnInit() {
    var self = this;
    this.coupons = new Array();
    self.servicer.getAllPurchasedCoupons().subscribe(
      (coupons) => {
        self.showSpinner = false;
        for (let c of coupons) {
          c = new Coupon(c);
          self.coupons.push(c);
        }
      }
    );
  }

  clickPurchase() {
    this.showSpinner = true;
    this.servicer.purchaseCoupon(this.coupon).subscribe(
      (success) =>{
        this.showSpinner = false;
      },
      (error) => {
        this.showSpinner = false;
        console.log("something went wrong");
      }
    );
  }

  clickPrice() {
    var self = this;
    self.showSpinner = true;
    this.coupons = new Array();
    self.servicer.getAllPurchasedCouponsByPrice(self.price).subscribe(
      (coupons) => {
        self.showSpinner = false;
        for (let c of coupons) {
          c = new Coupon(c);
          self.coupons.push(c);
        }
      }
    );
  }

  clickType() {
    var self = this;
    self.showSpinner = true;
    this.coupons = new Array();
    self.servicer.getAllPurchasedCouponsByType(self.type).subscribe(
      (coupons) => {
        self.showSpinner = false;
        for (let c of coupons) {
          c = new Coupon(c);
          self.coupons.push(c);
        }
      }
    );
  }
}
