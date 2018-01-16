import { CompanyService } from './../../services/company.service';
import { Coupon } from './../../models/coupon';
import { Component, OnInit } from '@angular/core';
import { CouponType } from './../../models/CouponType';
import swal from 'sweetalert';

@Component({
  selector: 'app-getallcoupons',
  templateUrl: './getallcoupons.component.html',
  styleUrls: ['./getallcoupons.component.css']
})
export class GetallcouponsComponent implements OnInit {

  public coupons : Coupon[] = [];
  public coupon : Coupon = new Coupon();
  public type : CouponType;
  public date: Date;
  public price : number;
  
  constructor(private servicer: CompanyService) { }
  
  clickDelete(){
    var self = this;
    self.servicer.deleteCoupon(self.coupon).subscribe(
      (success)=> {
        var message = this.coupon.getTitle + " was successfully deleted!";
        swal({
          title: "GREAT!",
          text: message,
          icon: "success",
        });
        this.reset();
       }
      );
  }
  clickUpdate(){
    this.servicer.updateCoupon(this.coupon).subscribe(
      (success)=> {
        var message = this.coupon.getTitle + " was successfully updated!"
        swal("Great job!", message, "success", {
        });
        this.reset();
       }
    );
  }

  ngOnInit() {
    var self = this;
    this.coupons = new Array();
    self.servicer.getAllCoupons().subscribe(
      (coupons)=>{
          for (let c of coupons) {
          c = new Coupon(c);
          self.coupons.push(c);
        }
      }
    );
  }

  clickPrice(){
    var self = this;
    this.coupons = new Array();
    self.servicer.getCouponsByPrice(self.price).subscribe(
      function (coupons) {
        for (let c of coupons) {
          c = new Coupon(c);
          self.coupons.push(c);
        }
      }
    );
  }

  clickDate(){
    var self = this;
    this.coupons = new Array();
    self.servicer.getCouponsByDate(self.date).subscribe(
      function (coupons) {
        for (let c of coupons) {
          c = new Coupon(c);
          self.coupons.push(c);
        }
      }
    );
  }

  clickType(){
    var self = this;
    this.coupons = new Array();
    self.servicer.getCouponsByType(self.type).subscribe(
      function (coupons) {
        for (let c of coupons) {
          c = new Coupon(c);
          self.coupons.push(c);
        }
      }
    );
  }

  setCoupon (coupon: Coupon) {
    this.coupon = coupon;
  }

  reset(){
    var self = this;
    this.coupons = new Array();
    self.servicer.getAllCoupons().subscribe(
      (coupons)=>{
        for (let c of coupons) {
        c = new Coupon(c);
        self.coupons.push(c);
      }
    }
    );
  }

}
