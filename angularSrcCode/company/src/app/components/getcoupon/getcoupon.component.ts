import { CompanyService } from './../../services/company.service';
import { Coupon } from './../../models/coupon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-getcoupon',
  templateUrl: './getcoupon.component.html',
  styleUrls: ['./getcoupon.component.css']
})
export class GetcouponComponent implements OnInit {

  public coupon: Coupon = new Coupon();
  public id: number;
  public messageError : String;
  public messageSuccess : String;
  showSpinner : boolean = false;

  constructor(private servicer: CompanyService) { }

  onClicked() {
    var self = this;
    self.showSpinner = true;
    this.messageError = undefined;
    this.messageSuccess = undefined;
    self.servicer.getCoupon(this.id).subscribe(
      (coupon) => {
        self.showSpinner = false;
        this.coupon = new Coupon(coupon)
        if(this.coupon.getId == 0){
          this.messageSuccess = 'There is no coupon with that id'
        }
      },
      (error) => {
        self.showSpinner = false;
        this.messageError = 'something went wrong';
      }
    );
  }

  ngOnInit() {
  }

}
