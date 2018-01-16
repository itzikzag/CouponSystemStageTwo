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
  public messageSuccess : String;
  public messageError : String;

  constructor(private servicer: CustomerService) { }
  
  ngOnInit() {
    var self = this;
    this.coupons = new Array();
    self.servicer.viewAllCoupons().subscribe(
      function (coupons) {
        for (let c of coupons) {
          c = new Coupon(c);
          self.coupons.push(c);
        }
      }
    );
  }
  
  clickPurchase() {
    this.servicer.purchaseCoupon(this.coupon).subscribe ( 
      (success)=> {
        this.messageSuccess = 'Coupon successfully purchased!'
        // console.log(this.message);
      },
      (error)=>{
        this.messageError = 'Could not purchase coupon because you already have this coupon!';
        // console.log(this.message);
      }
      );
  }

  setCoupon(coupon: Coupon) {
    this.messageSuccess = undefined;
    this.messageError = undefined;
    this.coupon = coupon;
    // console.log(this.message);
  }

}


