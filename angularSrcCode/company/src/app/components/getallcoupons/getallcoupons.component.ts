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

  showSpinner: boolean = true;
  
  constructor(private servicer: CompanyService) { }
  
  ngOnInit() {
    var self = this;
    this.coupons = new Array();
    self.servicer.getAllCoupons().subscribe(
      (coupons)=>{
          self.showSpinner = false;
          for (let c of coupons) {
          c = new Coupon(c);
          self.coupons.push(c);
        }
      }
    );
  }
  clickDelete(){
    var self = this;
    self.showSpinner = true;
    self.servicer.deleteCoupon(self.coupon).subscribe(
      (success)=> {
        self.showSpinner = false;
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
    this.showSpinner = true;
    this.servicer.updateCoupon(this.coupon).subscribe(
      (success)=> {
        this.showSpinner = false;
        var message = this.coupon.getTitle + " was successfully updated!"
        swal("Great job!", message, "success", {
        });
        this.reset();
       }
    );
  }


  clickPrice(){
    var self = this;
    self.showSpinner = true;
    this.coupons = new Array();
    self.servicer.getCouponsByPrice(self.price).subscribe(
      (coupons) => {
        self.showSpinner = false;
        for (let c of coupons) {
          c = new Coupon(c);
          self.coupons.push(c);
        }
      }
    );
  }

  clickDate(){
    var self = this;
    self.showSpinner = true;
    this.coupons = new Array();
    self.servicer.getCouponsByDate(self.date).subscribe(
      (coupons) => {
        self.showSpinner = false;
        for (let c of coupons) {
          c = new Coupon(c);
          self.coupons.push(c);
        }
      }
    );
  }

  clickType(){
    var self = this;
    self.showSpinner = true;
    this.coupons = new Array();
    self.servicer.getCouponsByType(self.type).subscribe(
      (coupons) => {
        self.showSpinner = false;
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
    self.showSpinner = true;
    this.coupons = new Array();
    self.servicer.getAllCoupons().subscribe(
      (coupons)=>{
        self.showSpinner = false;
        for (let c of coupons) {
        c = new Coupon(c);
        self.coupons.push(c);
      }
    }
    );
  }

}
