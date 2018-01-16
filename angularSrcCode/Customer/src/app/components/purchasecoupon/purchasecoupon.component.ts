import { CustomerService } from './../../services/customer.service';
import { Coupon } from './../../models/coupon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchasecoupon',
  templateUrl: './purchasecoupon.component.html',
  styleUrls: ['./purchasecoupon.component.css']
})
export class PurchasecouponComponent implements OnInit {

  public coupons: Coupon[];
  public coupon: Coupon = new Coupon();
  public messageSuccess: String;
  public messageError: String;
  showSpinner: boolean = true;

  constructor(private servicer: CustomerService) { }

  ngOnInit() {
    var self = this;
    this.coupons = new Array();
    self.servicer.viewAllCoupons().subscribe(
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
      (success) => {
        this.showSpinner = false;
        this.messageSuccess = 'Coupon successfully purchased!'

      },
      (error) => {
        this.showSpinner = false;
        this.messageError = 'Could not purchase coupon because you already have this coupon!';
      }
    );
  }

  setCoupon(coupon: Coupon) {
    this.messageSuccess = undefined;
    this.messageError = undefined;
    this.coupon = coupon;
  }

}


