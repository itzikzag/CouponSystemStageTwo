import { CompanyService } from './../../services/company.service';
import { Coupon } from './../../models/coupon';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-createcoupon',
  templateUrl: './createcoupon.component.html',
  styleUrls: ['./createcoupon.component.css']
})
export class CreatecouponComponent implements OnInit {

  public newCouponForm: FormGroup;
  public coupon: Coupon = new Coupon();
  public coupons: Coupon[];
  public messageSuccess: String;
  public messageError: String;
  constructor(private servicer: CompanyService, private fb: FormBuilder) { }

  createCoupon() {

    this.messageError = undefined;
    this.messageSuccess = undefined;
    this.servicer.createCoupon(this.coupon).subscribe(
      (success) => {
        this.messageSuccess = 'Coupon was created successfully!';
      },
      (error) => {
        this.messageError = 'could not create a coupon!';
      }
    );
  }
  ngOnInit() {
    var self = this;
    this.coupons = new Array();
    self.servicer.getAllCoupons().subscribe(
      function (coupons) {
        for (let c of coupons) {
          c = new Coupon(c);
          self.coupons.push(c);
        }
      }
    );
    self.newCouponForm = self.fb.group({
      'title': [null, [Validators.required, this.uniqueNameValidator.bind(this)]],
      'startDate': [null, [Validators.required]],
      'endDate': [null, [Validators.required]],
      'amount': [null, [Validators.required, Validators.min(0)]],
      'type': [null, [Validators.required]],
      'message': [null, [Validators.required]],
      'price': [null, [Validators.required, Validators.min(0)]],
      'image': [null, [Validators.required]]
    })
  }


  uniqueNameValidator(control: FormControl): { [message: string]: boolean } {
    var self = this;
    var taken: boolean = false;
    for (let coupon of self.coupons) {
      if (coupon.getTitle === control.value) {
        taken = true;
        break;
      }
    }

    if (taken === true) {
      return { 'NameIsTaken': true };
    }
    return null;
  }

}
