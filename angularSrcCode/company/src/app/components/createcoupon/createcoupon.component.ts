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

  showSpinner: boolean = true;

  constructor(private servicer: CompanyService, private fb: FormBuilder) { }

  ngOnInit() {
    var self = this;
    this.coupons = new Array();
    self.servicer.getAllCoupons().subscribe(
      (coupons)=> {
        self.showSpinner = false;
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

  createCoupon() {

    this.showSpinner = true;
    this.messageError = undefined;
    this.messageSuccess = undefined;
    this.servicer.createCoupon(this.coupon).subscribe(
      (success) => {
        this.showSpinner = false;
        this.messageSuccess = 'Coupon was created successfully!';
      },
      (error) => {
        this.showSpinner = false;
        this.messageError = 'could not create a coupon!';
      }
    );
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
